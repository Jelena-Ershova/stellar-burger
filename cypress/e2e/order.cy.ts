describe('Тестируем создание заказов', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1280, 720);
    cy.visit('/');

    cy.get('[data-cy = "constructor"]').as('constructorOrder');
  });

  it('Creating an order', () => {
    cy.get('[data-cy = "Флюоресцентная булка R2-D3"]')
      .children('button')
      .click({ force: true });
    cy.get('[data-cy = "Филе Люминесцентного тетраодонтимформа"]')
      .children('button')
      .click({ force: true });
    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ]
      });
    cy.get('[data-cy = "modal"]').should(
      'contain.text',
      'Ваш заказ начали готовить'
    );
    cy.get('[data-cy = "order-num"]')
      .should('contain.text', '45609')
      .as('number');
    cy.get('[data-cy = "modal-close"]').click();
    cy.get('@number').should('not.exist');

    cy.get('@constructorOrder')
      .contains('Флюоресцентная булка R2-D3')
      .should('not.exist');

    cy.get('@constructorOrder')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('not.exist');
  });
});

afterEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});
