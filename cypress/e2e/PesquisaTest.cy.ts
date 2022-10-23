describe("Pesuisa test", () => {
  it("Pesquisa heroi", () => {
    cy.visit("/");
    cy.get('[data-testid="heroi30"] > :nth-child(1)').should((heroi) => {
      expect(heroi).to.not.exist;
    });

    cy.get(".chakra-input").type("batman");

    cy.get('[data-testid="heroi69"] > :nth-child(1)').should((batman) => {
      expect(batman).to.exist;
    });
  });
  it("Pesquisa heroi", () => {
    cy.visit("/grupos");
    cy.get('[data-testid="grupo20"] > :nth-child(1)').should((heroi) => {
      expect(heroi).to.not.exist;
    });

    cy.get(".chakra-input").type("Wildstorm");

    cy.get(
      '[data-testid="grupo15"] > :nth-child(1) > .css-k008qs > .css-13o6z6d'
    ).should((grupo) => {
      expect(grupo).to.exist;
    });
  });
});
