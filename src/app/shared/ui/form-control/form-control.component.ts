import { NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormControlErrorComponent } from '../form-control-error/form-control-error.component';

@Component({
  selector: 'asm-form-control',
  standalone: true,
  imports: [
    FormControlErrorComponent,
    FormsModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
  ],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss',
})
export class FormControlComponent {
  @Input({ required: true }) type: 'text' | 'email' | 'password' | 'checkbox' =
    'text';
  @Input({ required: true }) displayName = 'Field';
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) control!: FormControl;

  get isRequired() {
    if (this.type === 'checkbox') {
      return this.control.hasValidator(Validators.requiredTrue);
    }

    return this.control.hasValidator(Validators.required);
  }
}
