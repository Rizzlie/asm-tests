import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  it('should mount', () => {
    cy.mount('<asm-alert type="success">Test</asm-alert>', {
      imports: [AlertComponent],
    });
  });

  it('should render passed text', () => {
    cy.mount('<asm-alert type="success">Test</asm-alert>', {
      imports: [AlertComponent],
    });

    cy.contains('Test');
  });

  it('should have success class', () => {
    cy.mount('<asm-alert type="success">Test</asm-alert>', {
      imports: [AlertComponent],
    });

    cy.get('asm-alert .alert')
      .then($el => $el[0].className)
      .should('match', /alert-success/);
  });

  it('should have error class', () => {
    cy.mount('<asm-alert type="error">Test</asm-alert>', {
      imports: [AlertComponent],
    });

    cy.get('asm-alert .alert')
      .then($el => $el[0].className)
      .should('match', /alert-error/);
  });
});
