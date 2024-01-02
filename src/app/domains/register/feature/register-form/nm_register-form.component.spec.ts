import { RegisterFormComponent } from '@/domains/register';
import { fakeAsync, flush, tick } from '@angular/core/testing';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks,
} from 'ng-mocks';
import { delay, of, throwError } from 'rxjs';
import { RegisterService } from '../register.service';

describe(RegisterFormComponent.name, () => {
  let component: RegisterFormComponent;
  let fixture: MockedComponentFixture<RegisterFormComponent>;
  let registerService: RegisterService;

  beforeEach(() => MockBuilder([RegisterFormComponent], [RegisterService]));

  beforeEach(() => {
    fixture = MockRender(RegisterFormComponent);
    component = fixture.point.componentInstance;
    registerService = ngMocks.findInstance(RegisterService);
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
