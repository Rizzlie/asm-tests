import { FormControl, FormGroup } from '@angular/forms';
import { matchValidator } from './matchValidator';

describe('matchValidator', () => {
  let form: FormGroup;

  beforeEach(() => {
    form = new FormGroup({
      password: new FormControl('test'),
      confirmPassword: new FormControl('test', [matchValidator('password')]),
    });
  });

  it('should check if the passwords match', () => {
    form.controls['confirmPassword'].setValue('test1');

    expect(form.controls['confirmPassword'].errors).toEqual({
      matching: 'password',
    });
  });

  it('should return null if the passwords match', () => {
    form.controls['confirmPassword'].setValue('test');

    expect(form.controls['confirmPassword'].errors).toBeNull();
  });
});
