import { EMAIL_PATTERN } from './patterns';

describe('Email pattern', () => {
  it('should match email pattern', () => {
    const email = 'john.doe@example.com';
    const regexp = new RegExp(EMAIL_PATTERN);

    expect(regexp.test(email)).toBeTrue();
  });

  it('should not match email pattern', () => {
    const email = 'johndoe@example';
    const regexp = new RegExp(EMAIL_PATTERN);

    expect(regexp.test(email)).toBeFalse();
  });
});
