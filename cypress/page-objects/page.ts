export class Page {
  goTo(path: string) {
    cy.visit(path);
  }

  get(selector: string) {
    return cy.get(`[data-cy="${selector}"]`);
  }

  click(selector: string) {
    return this.get(selector).click();
  }

  check(selector: string) {
    return this.get(selector).check().blur();
  }

  type(selector: string, text: string) {
    return this.get(selector).clear().type(text).blur();
  }

  shouldBeDisabled(selector: string) {
    return this.get(selector).should('be.disabled');
  }

  shouldBeEnabled(selector: string) {
    return this.get(selector).should('be.enabled');
  }

  shouldBeHidden(selector: string) {
    return this.get(selector).should('be.hidden');
  }

  shouldBeVisible(selector: string) {
    return this.get(selector).should('be.visible');
  }

  shouldContainText(selector: string, text: string) {
    return this.get(selector).should('contain.text', text);
  }
}
