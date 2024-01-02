import { Home } from '../page-objects/home.po';

describe('Register Form', () => {
  it('should register a new user', () => {
    const homePage = new Home();

    homePage
      .navigate()
      .firstName('John')
      .lastName('Doe')
      .login('john.doe')
      .email('john.doe@example.com')
      .password('Pa$$w0rd!')
      .repeatPassword('Pa$$w0rd!')
      .acceptToS()
      .submit();

    homePage.shouldShowSuccessAlert();
  });

  it('should show an error when the login already exists', () => {
    const homePage = new Home();

    homePage
      .navigate()
      .firstName('John')
      .lastName('Doe')
      .login('mockAdmin')
      .email('john.doe@example.com')
      .password('Pa$$w0rd!')
      .repeatPassword('Pa$$w0rd!')
      .acceptToS()
      .submit();

    homePage.shouldShowErrorWhenLoginAlreadyExists();
  });

  describe('First Name', () => {
    it('should show an error when the first name is empty', () => {
      const homePage = new Home();

      homePage
        .navigate()
        .firstName('{ESC}')
        .lastName('Doe')
        .login('john.doe')
        .email('john.doe@example.com')
        .password('Pa$$w0rd!')
        .repeatPassword('Pa$$w0rd!')
        .acceptToS();

      homePage.submitShouldBeDisabled().shouldShowFirstNameRequiredError();
    });
  });

  describe('Last Name', () => {
    it('should show an error when the last name is empty', () => {
      const homePage = new Home();

      homePage
        .navigate()
        .firstName('John')
        .lastName('{ESC}')
        .login('john.doe')
        .email('john.doe@example.com')
        .password('Pa$$w0rd!')
        .repeatPassword('Pa$$w0rd!')
        .acceptToS();

      homePage.submitShouldBeDisabled().shouldShowLastNameRequiredError();
    });
  });

  describe('Login', () => {
    it('should show an error when the login is empty', () => {
      const homePage = new Home();

      homePage
        .navigate()
        .firstName('John')
        .lastName('Doe')
        .login('{ESC}')
        .email('john.doe@example.com')
        .password('Pa$$w0rd!')
        .repeatPassword('Pa$$w0rd!')
        .acceptToS();

      homePage.submitShouldBeDisabled().shouldShowLoginRequiredError();
    });
  });

  describe('Email', () => {
    it('should show an error when the email is empty', () => {
      const homePage = new Home();

      homePage
        .navigate()
        .firstName('John')
        .lastName('Doe')
        .login('john.doe')
        .email('{ESC}')
        .password('Pa$$w0rd!')
        .repeatPassword('Pa$$w0rd!')
        .acceptToS();

      homePage.submitShouldBeDisabled().shouldShowEmailRequiredError();
    });

    it('should show an error when the email is invalid', () => {
      const homePage = new Home();

      homePage
        .navigate()
        .firstName('John')
        .lastName('Doe')
        .login('john.doe')
        .email('john.doe')
        .password('Pa$$w0rd!')
        .repeatPassword('Pa$$w0rd!')
        .acceptToS();

      homePage.submitShouldBeDisabled().shouldShowEmailInvalidError();
    });
  });

  describe('Password', () => {
    it('should show an error when the password is empty', () => {
      const homePage = new Home();

      homePage
        .navigate()
        .firstName('John')
        .lastName('Doe')
        .login('john.doe')
        .email('john.doe@example.com')
        .password('{ESC}')
        .repeatPassword('Pa$$w0rd!')
        .acceptToS();

      homePage.submitShouldBeDisabled().shouldShowPasswordRequiredError();
    });

    it('should show an error when the password is too short', () => {
      const homePage = new Home();

      homePage
        .navigate()
        .firstName('John')
        .lastName('Doe')
        .login('john.doe')
        .email('john.doe@example.com')
        .password('P4s$')
        .repeatPassword('P4s$')
        .acceptToS();

      homePage.submitShouldBeDisabled().shouldShowPasswordTooShortError();
    });

    it('should show an error when the password is too long', () => {
      const homePage = new Home();

      homePage
        .navigate()
        .firstName('John')
        .lastName('Doe')
        .login('john.doe')
        .email('john.doe@example.com')
        .password('P4s$word000000000000000000000')
        .repeatPassword('P4s$word000000000000000000000')
        .acceptToS();

      homePage.submitShouldBeDisabled().shouldShowPasswordTooLongError();
    });

    it('should show an error when the password is too weak', () => {
      const homePage = new Home();

      homePage
        .navigate()
        .firstName('John')
        .lastName('Doe')
        .login('john.doe')
        .email('john.doe@example.com')
        .password('password')
        .repeatPassword('password')
        .acceptToS();

      homePage.submitShouldBeDisabled().shouldShowPasswordTooWeakError();
    });
  });

  describe('Repeat Password', () => {
    it('should show an error when the password is empty', () => {
      const homePage = new Home();

      homePage
        .navigate()
        .firstName('John')
        .lastName('Doe')
        .login('john.doe')
        .email('john.doe@example.com')
        .password('Pa$$w0rd!')
        .repeatPassword('{ESC}')
        .acceptToS();

      homePage.submitShouldBeDisabled().shouldShowRepeatPasswordRequiredError();
    });

    it('should show an error when the passwords do not match', () => {
      const homePage = new Home();

      homePage
        .navigate()
        .firstName('John')
        .lastName('Doe')
        .login('john.doe')
        .email('john.doe@example.com')
        .password('Pa$$w0rd!')
        .repeatPassword('Pa$$w0rd')
        .acceptToS();

      homePage.submitShouldBeDisabled().shouldShowRepeatPasswordMismatchError();
    });
  });

  describe('Terms of Service', () => {
    it('should disable submit the ToS is not accepted', () => {
      const homePage = new Home();

      homePage
        .navigate()
        .firstName('John')
        .lastName('Doe')
        .login('john.doe')
        .email('john.doe@example.com')
        .password('Pa$$w0rd!')
        .repeatPassword('Pa$$w0rd!');

      homePage.submitShouldBeDisabled();
    });
  });
});
