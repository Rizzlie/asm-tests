import {
  AlertComponent,
  ButtonComponent,
  FormControlComponent,
  LoaderComponent,
} from '@/ui';
import { EMAIL_PATTERN, matchValidator } from '@/utils';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../register.service';

@Component({
  selector: 'asm-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormControlComponent,
    ButtonComponent,
    LoaderComponent,
    AlertComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  form = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
        Validators.minLength(6),
        Validators.maxLength(25),
        matchValidator('repeatPassword', true),
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        matchValidator('password'),
      ]),
      tos: new FormControl(false, [Validators.requiredTrue]),
    },
    { updateOn: 'blur' }
  );

  loading = signal(false);
  success = signal(false);

  #registerService = inject(RegisterService);

  submit() {
    this.loading.set(true);

    if (!this.form.valid) {
      return;
    }

    this.#registerService
      .register({
        firstName: this.form.value.firstName!,
        lastName: this.form.value.lastName!,
        login: this.form.value.login!,
        email: this.form.value.email!,
        password: this.form.value.password!,
      })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.showSuccess();
          this.form.reset();
        },
        error: () => {
          this.loading.set(false);
          this.form.setErrors({ login: 'alreadyExists' });
        },
      });
  }

  showSuccess() {
    this.success.set(true);

    setTimeout(() => {
      this.success.set(false);
    }, 3000);
  }
}
