import { Page } from './page';

export class Home extends Page {
  #firstName = 'firstName';
  #lastName = 'lastName';
  #email = 'email';
  #login = 'login';
  #password = 'password';
  #repeatPassword = 'repeatPassword';
  #tos = 'tos';
  #submit = 'submit';
  #successAlert = 'success-alert';
  #errorAlert = 'error-alert';

  navigate() {
    this.goTo('/');

    return this;
  }

  firstName(firstName: string) {
    this.type(this.#firstName, firstName);

    return this;
  }

  lastName(lastName: string) {
    this.type(this.#lastName, lastName);

    return this;
  }

  email(email: string) {
    this.type(this.#email, email);

    return this;
  }

  login(login: string) {
    this.type(this.#login, login);

    return this;
  }

  password(password: string) {
    this.type(this.#password, password);

    return this;
  }

  repeatPassword(repeatPassword: string) {
    this.type(this.#repeatPassword, repeatPassword);

    return this;
  }

  acceptToS() {
    this.check(this.#tos);

    return this;
  }

  submit() {
    this.click(this.#submit);

    return this;
  }

  shouldShowSuccessAlert() {
    this.shouldBeVisible(this.#successAlert);

    return this;
  }

  submitShouldBeDisabled() {
    this.shouldBeDisabled(this.#submit);

    return this;
  }

  shouldShowFirstNameRequiredError() {
    this.shouldContainText(
      `${this.#firstName}-error`,
      'First name is required'
    );

    return this;
  }

  shouldShowLastNameRequiredError() {
    this.shouldContainText(`${this.#lastName}-error`, 'Last name is required');

    return this;
  }

  shouldShowLoginRequiredError() {
    this.shouldContainText(`${this.#login}-error`, 'Login is required');

    return this;
  }

  shouldShowEmailRequiredError() {
    this.shouldContainText(`${this.#email}-error`, 'Email is required');

    return this;
  }

  shouldShowEmailInvalidError() {
    this.shouldContainText(
      `${this.#email}-error`,
      'Email is not a valid email'
    );

    return this;
  }

  shouldShowPasswordRequiredError() {
    this.shouldContainText(`${this.#password}-error`, 'Password is required');

    return this;
  }

  shouldShowPasswordTooShortError() {
    this.shouldContainText(
      `${this.#password}-error`,
      'Password must be at least 6 characters long'
    );

    return this;
  }

  shouldShowPasswordTooLongError() {
    this.shouldContainText(
      `${this.#password}-error`,
      'Password cannot be more than 25 characters long'
    );

    return this;
  }

  shouldShowPasswordTooWeakError() {
    this.shouldContainText(`${this.#password}-error`, 'Password is invalid');

    return this;
  }

  shouldShowRepeatPasswordRequiredError() {
    this.shouldContainText(
      `${this.#repeatPassword}-error`,
      'Repeat password is required'
    );

    return this;
  }

  shouldShowRepeatPasswordMismatchError() {
    this.shouldContainText(
      `${this.#repeatPassword}-error`,
      'Repeat password must match password'
    );

    return this;
  }

  shouldShowErrorWhenLoginAlreadyExists() {
    this.shouldContainText(`${this.#errorAlert}`, 'Login taken!');

    return this;
  }
}
