import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  it('should mount', () => {
    cy.mount('<asm-button>Test</asm-button>', {
      imports: [ButtonComponent],
    });
  });

  it('should render passed text', () => {
    cy.mount('<asm-button>Click me!</asm-button>', {
      imports: [ButtonComponent],
    });

    cy.get('button').contains('Click me!');
  });

  it('button should be disabled', () => {
    cy.mount('<asm-button [disabled]="true">Click me!</asm-button>', {
      imports: [ButtonComponent],
    });

    cy.get('button').should('be.disabled');
  });

  it('button should be enabled', () => {
    cy.mount('<asm-button [disabled]="false">Click me!</asm-button>', {
      imports: [ButtonComponent],
    });

    cy.get('button').should('be.enabled');
  });

  it('button should have submit type', () => {
    cy.mount('<asm-button type="submit">Click me!</asm-button>', {
      imports: [ButtonComponent],
    });

    cy.get('button').should('have.attr', 'type', 'submit');
  });

  it('button should have button type', () => {
    cy.mount('<asm-button type="button">Click me!</asm-button>', {
      imports: [ButtonComponent],
    });

    cy.get('button').should('have.attr', 'type', 'button');
  });
});
