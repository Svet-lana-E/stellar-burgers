import { should } from 'chai';

const bunId = '643d69a5c3f7b9001cfa093c';
const ingredientId = '643d69a5c3f7b9001cfa0941';
const extraIngredientId = '643d69a5c3f7b9001cfa0943';

describe('проверяем доступность приложения', () => {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000/');
  });
});

describe('проверяем работу конструктора', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  it('проверяем отображение ингредиентов', () => {
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.contains('Соус фирменный Space Sauce').should('exist');
  });

  it('проверяем добавление булки в конструктор', () => {
    cy.addIngredientToConstructor(bunId);
    cy.checkIngredientCounter(bunId, 2);

    cy.get('[data-cy=constructor-bun]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });

  it('проверяем добавление начинок в конструктор', () => {
    cy.log('=== 1. Добавление первой начинки ===');
    cy.addIngredientToConstructor(ingredientId);
    cy.checkIngredientCounter(ingredientId, 1);
    cy.get('[data-cy=constructor-fill]')
      .as('fillingIngredients')
      .find('li:contains("Биокотлета из марсианской Магнолии")')
      .as('mainIngredient')
      .should('have.length', 1);

    cy.log('=== 2. Добавление второй такой же начинки ===');
    cy.addIngredientToConstructor(ingredientId);
    cy.checkIngredientCounter(ingredientId, 2);
    cy.get('@mainIngredient').should('have.length', 2);

    cy.log('=== 3. Добавление другой начинки к ранее добавленным ===');
    cy.addIngredientToConstructor(extraIngredientId);
    cy.checkIngredientCounter(extraIngredientId, 1);
    cy.get('@fillingIngredients').find('li').should('have.length', 3);

    cy.get('@mainIngredient').should('have.length', 2);
    cy.get('@fillingIngredients')
      .find('li:contains("Соус фирменный Space Sauce")')
      .should('have.length', 1);
  });

  it('проверяем открытие и закрытие модального окна с данными ингредиента по кнопке', () => {
    cy.log('=== 1. Открытие модального окна ===');
    cy.get(`[data-cy=ingredient-${ingredientId}]`).click();
    cy.get(`[data-cy=modal-element]`)
      .as('modalElement')
      .should('be.visible')
      .and('contain', 'Детали ингредиента')
      .and('contain', 'Биокотлета из марсианской Магнолии');

    cy.log('=== 2. Закрытие модального окна ===');
    cy.get('@modalElement').find('[data-cy=modal-close-button]').click();
    cy.get('@modalElement').should('not.exist');
  });

  it('проверяем закрытие модального окна с данными ингредиента по оверлей', () => {
    cy.get(`[data-cy=ingredient-${ingredientId}]`).click();
    cy.get(`[data-cy=modal-element]`).as('modalElement').should('be.visible');

    cy.get('[data-cy=overlay-element]').click({ force: true });
    cy.get('@modalElement').should('not.exist');
  });

  it('проверяем закрытие модального окна с данными ингредиента по оверлей', () => {
    cy.get(`[data-cy=ingredient-${ingredientId}]`).click();
    cy.get(`[data-cy=modal-element]`).as('modalElement').should('be.visible');

    cy.get('[data-cy=overlay-element]').click({ force: true });
    cy.get('@modalElement').should('not.exist');
  });
});

describe('проверяем создание заказа', () => {
  describe('невозможно создать заказ без булки и/или ингредиентов', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.intercept('GET', '**/api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
      cy.intercept('POST', '**/api/orders').as('createOrder');
      cy.get('[data-cy=handle-order-button]').as('handleOrderButton');
    });

    it('невозможно создать пустой заказ', () => {
      cy.get('@handleOrderButton').click();
      cy.get('[data-cy=modal-element]').should('not.exist');
      cy.get('@createOrder').should('not.exist');
    });

    it('невозможно создать заказ без булки (только с ингредиентом)', () => {
      cy.addIngredientToConstructor(ingredientId);
      cy.get('@handleOrderButton').click();
      cy.get('[data-cy=modal-element]').should('not.exist');
      cy.get('@createOrder').should('not.exist');
    });

    it('невозможно создать заказ без хотя бы одного ингредиента(только с булкой)', () => {
      cy.addIngredientToConstructor(bunId);
      cy.get('@handleOrderButton').click();
      cy.get('[data-cy=modal-element]').should('not.exist');
      cy.get('@createOrder').should('not.exist');
    });
  });
});

describe('проверяем наличие авторизации пользователя при создании заказа (пользователь не авторизован)', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.wait('@getIngredients');
    cy.addIngredientToConstructor(bunId);
    cy.addIngredientToConstructor(ingredientId);
    cy.intercept('POST', '**/api/orders').as('createOrder');
  });

  it('редирект на страницу логина при отсутствии авторизации', () => {
    cy.get('[data-cy=handle-order-button]').as('handleOrderButton');
    cy.get('@handleOrderButton').click();
    cy.get('[data-cy=modal-element]').should('not.exist');
    cy.get('@createOrder').should('not.exist');
    cy.url().should('include', 'login');
  });
});

describe('проверяем оформление заказа при наличии авторизации', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.fixture('auth-token-response.json').then((authData) => {
      cy.intercept('GET', '**/api/auth/user', {
        statusCode: 200,
        body: {
          success: authData.success,
          user: authData.user
        }
      }).as('getUser');
      cy.setCookie('accessToken', authData.accessToken, {
        path: '/',
        httpOnly: false,
        secure: false
      });
      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('refreshToken', authData.refreshToken);
          win.localStorage.setItem('user', JSON.stringify(authData.user));
        }
      });
      cy.wait('@getUser');
    });
    cy.wait('@getIngredients');
    cy.addIngredientToConstructor(bunId);
    cy.addIngredientToConstructor(ingredientId);
  });

  it('оформление заказа при наличии авторизации', () => {
    cy.log('=== 1. Проверка наличия авторизации пользователя ===');
    cy.get('[data-cy=user-name]').should('be.visible').and('have.text', 'User');

    cy.log('=== 2. Проверка сборки бургера ===');
    cy.get('[data-cy=constructor-bun]')
      .as('constructorBun')
      .should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy=constructor-fill]')
      .as('constructorFill')
      .should('contain', 'Биокотлета из марсианской Магнолии');
    cy.get('[class="constructor-element__price"]')
      .should('exist')
      .and('have.length', 3)
      .then(($prices) => {
        let totalPrice = 0;
        $prices.each((index, item) => {
          const priceText = Cypress.$(item).text();
          const price = +priceText;
          totalPrice += price;
        });
        cy.get('[data-cy=burger-total-price]')
          .as('burgerPrice')
          .should('contain', totalPrice);
      });

    cy.log('=== 3. Оформление заказа ===');
    cy.get('[data-cy=handle-order-button]').click();
    cy.intercept('POST', '**/api/orders', {
      fixture: 'order-response.json'
    }).as('postNewOrder');
    cy.intercept('GET', '**/api/orders/all', {
      fixture: 'orders-all.json'
    });

    cy.log('=== 4. Проверка открытия модального окна оформления заказа ===');
    cy.get('[data-cy=modal-element]')
      .should('exist')
      .and('contain', 'Оформляем заказ');

    cy.log(
      '=== 5. Проверка наличичия корректного номера заказа в модальном окне ответа ==='
    );
    cy.wait('@postNewOrder');
    cy.fixture('order-response.json').then((orderData) => {
      cy.get('[data-cy=modal-element]')
        .as('modal-element')
        .should('exist')
        .and('contain', orderData.order.number.toString());

      cy.log('=== 6. Проверка закрытия модального окна ===');
      cy.get('@modal-element').find('button').click().should('not.exist');
    });

    cy.log('=== 7. Проверка очистки конструктора ===');
    cy.get('@constructorBun').should('not.exist');
    cy.get('[data-cy=constructor-bun-null]')
      .should('contain', 'Выберите булки')
      .and('have.length', 2);
    cy.get('@constructorFill')
      .should('contain', 'Выберите начинку')
      .and('have.length', 1);
    cy.get('@burgerPrice').should('contain', 0);
  });
});
