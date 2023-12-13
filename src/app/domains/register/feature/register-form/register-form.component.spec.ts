import { AlertComponent, ButtonComponent, LoaderComponent } from '@/ui';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { delay, of, throwError } from 'rxjs';
import { RegisterService } from '../register.service';

import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let registerService: RegisterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RegisterFormComponent,
        ReactiveFormsModule,
        ButtonComponent,
        LoaderComponent,
        AlertComponent,
      ],
      providers: [RegisterService],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    registerService = TestBed.inject(RegisterService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    beforeEach(() => {
      component.form.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        login: 'john.doe',
        email: 'john.doe@example.com',
        password: 'Test12345!',
        repeatPassword: 'Test12345!',
        tos: true,
      });
    });

    it('should call register service', () => {
      spyOn(registerService, 'register').and.returnValue(of(true));

      component.submit();

      expect(registerService.register).toHaveBeenCalled();
    });

    it('should reset form', fakeAsync(() => {
      spyOn(registerService, 'register').and.returnValue(
        of(true).pipe(delay(10))
      );

      component.submit();

      expect(component.loading()).toBe(true);

      tick(10);

      expect(component.loading()).toBe(false);

      flush();
    }));

    it('should call showSuccess', () => {
      spyOn(registerService, 'register').and.returnValue(of(true));
      spyOn(component, 'showSuccess');

      component.submit();

      expect(component.showSuccess).toHaveBeenCalled();
    });

    it('should set error', () => {
      spyOn(registerService, 'register').and.returnValue(
        throwError(() => new Error('Error'))
      );

      component.submit();

      expect(component.form.errors).toEqual({ login: 'alreadyExists' });
    });

    it('should not call register service', () => {
      spyOn(registerService, 'register').and.returnValue(of(true));

      component.form.patchValue({
        tos: false,
      });

      component.submit();

      expect(registerService.register).not.toHaveBeenCalled();
    });
  });

  describe('showSuccess', () => {
    it('should set success', () => {
      component.showSuccess();

      expect(component.success()).toBe(true);
    });

    it('should reset success', fakeAsync(() => {
      component.showSuccess();

      tick(3000);

      expect(component.success()).toBe(false);
    }));
  });
});
