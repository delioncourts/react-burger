import { BASE_URL } from "../../src/utils/api";

describe('stellar burger test', () => {

  beforeEach(() => {
    window.localStorage.setItem("refreshToken", JSON.stringify("test-refreshToken"));
    window.localStorage.setItem("accessToken", "test-accessToken");

    cy.intercept('GET', `${BASE_URL}auth/user`, {
      fixture: 'user.json',
    })

    cy.intercept('POST', `${BASE_URL}orders`, {
      fixture: 'order.json',
    })

    cy.visit('/')
  });

  it('should load main page', () => {
    cy.visit('/');
    cy.contains('Соберите бургер');
  });

  it("should open and close modal with ingredient", () => {
    cy.get('[alt="Соус Spicy-X"]').click();
    cy.get('[data-cy="ingredient-details-modal"]').contains(
      "Соус Spicy-X"
    );

    cy.get('[data-cy="modal-close-button"]').as('closeButton');
    cy.get("@closeButton").click();
    cy.get("@closeButton").should("not.exist");
  });

  it('should create order with dnd and open modal in burger constructor', () => {
    cy.get('[alt="Флюоресцентная булка R2-D3"]').trigger("dragstart");
    cy.get('[data-cy="burger-constructor"]').as('constructor');
    cy.get('@constructor').trigger("drop");
    cy.get('[alt="Говяжий метеорит (отбивная)"]').trigger("dragstart");
    cy.get('@constructor').trigger("drop");
    cy.get('[alt="Соус фирменный Space Sauce"]').trigger(
      "dragstart"
    );
    cy.get('@constructor').trigger("drop");

    cy.get('[data-cy="order-button"]').click();
    cy.get('[data-cy="order-details-modal"]').contains("идентификатор заказа");

    cy.get('[data-cy="modal-close-button"]').as('closeButton');
    cy.get("@closeButton").click();
    cy.get("@closeButton").should("not.exist");
  });
})