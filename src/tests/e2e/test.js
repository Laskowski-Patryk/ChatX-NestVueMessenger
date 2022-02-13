describe("example to-do app", () => {
    beforeEach(() => {
      cy.visit("http://localhost:8080/");
    });
  
    it("logging into account", () => {
      cy.get(".todo-list li").should("have.length", 2);
      const login = 'test'
      const password = 'lasek'
      cy.get('#username-input').type(`${login}`)
      cy.get('#username-input').type(`${password}{enter}`)
      
    });
  //   it("", () => {
  //     cy.get(".todo-list li").should("have.length", 2);
  //     cy.get(".todo-list li")
  //       .first()
  //       .should("have.text", "Pay electric bill");
  //     cy.get(".todo-list li")
  //       .last()
  //       .should("have.text", "Walk the dog");
  //   });
  
  });
  