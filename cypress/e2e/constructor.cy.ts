describe('checking the constructor', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');

    cy.get('[data-cy = "constructor"]').as('constructor');
    cy.get('[data-cy = "Краторная булка N-200i"]').as('testName');
  });

  describe('Testing the addition of ingredients to the constructor', () => {
    it('adding ingredients to the constructo', () => {
      cy.get('@testName').children('button').click({ force: true });
      cy.get('[data-cy = "Биокотлета из марсианской Магнолии"]')
        .children('button')
        .click({ force: true });
      cy.get('[data-cy = "Соус Spicy-X"]')
        .children('button')
        .click({ force: true });

      cy.get('@constructor').contains('Краторная булка N-200i').should('exist');
      cy.get('@constructor')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
      cy.get('@constructor').contains('Соус Spicy-X').should('exist');
      cy.get('@constructor').contains('Краторная булка N-200i').should('exist');
    });
  });

  describe('Testing the modal window', () => {
    it('opening the modal window', () => {
      cy.get('@testName').click();
      cy.get('[data-cy = "modal"]').should(
        'contain.text',
        'Детали ингредиента'
      );
      cy.get('[data-cy = "modal"]').should(
        'contain.text',
        'Краторная булка N-200i'
      );
    });

    it('closing the modal window by clicking on the button', () => {
      cy.get('@testName').click();
      cy.get('[data-cy = "modal"]').as('modal');
      cy.get('@modal').should('contain.text', 'Детали ингредиента');
      cy.get('[data-cy = "modal-close"]').click();
      cy.get('@modal').should('not.exist');
    });

    it('closing the modal window by clicking on overlay', () => {
      cy.get('@testName').click();
      cy.get('[data-cy = "modal"]').as('modal');
      cy.get('@modal').should('exist');
      cy.get('[data-cy = "overlay"]').click({ force: true });
      cy.get('@modal').should('not.exist');
    });
  });
});
