describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("logging into account and logging out", () => {
    const login = 'test'
    const password = 'lasek'
    cy.get('#username-input').type(`${login}`)
    cy.get('#password-input').type(`${password}{enter}`)
    cy.get('.btn-search').should("be.visible")
    cy.get("#btn-options").click()
    cy.get(".option-logout").click()
    cy.get('.center-form').should("be.visible")
  });

});
