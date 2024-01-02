import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { FormControlComponent } from './form-control.component';

describe('FormControlComponent', () => {
  let component: FormControlComponent;
  let fixture: ComponentFixture<FormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormControlComponent);
    component = fixture.componentInstance;
    component.type = 'text';
    component.control = new FormControl();
    component.controlName = 'test';
    component.displayName = 'Test';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isRequired', () => {
    it('should return true if control has required validator', () => {
      component.control.setValidators([Validators.required]);

      expect(component.isRequired).toBeTrue();
    });

    it('should return true if control has requiredTrue validator', () => {
      component.type = 'checkbox';
      component.control.setValidators([Validators.requiredTrue]);

      expect(component.isRequired).toBeTrue();
    });

    it('should return false if control has no required validator', () => {
      expect(component.isRequired).toBeFalse();
    });
  });
});
