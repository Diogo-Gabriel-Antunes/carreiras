describe("Delete test", () => {
  it("Deleta grupo", () => {
    cy.visit("/grupos");
    cy.wait(500);
    cy.get("[data-testid = 'grupo1']").should((id) => {
      expect(id).to.exist;
    });

    cy.get(
      ":nth-child(1) > :nth-child(5) > .css-k008qs > .css-13o6z6d > .chakra-button"
    ).click();

    cy.get("[data-testid = 'grupo1']").should((id) => {
      expect(id).to.not.exist;
    });
  });

  it("Deleta heroi do grupo", () => {
    cy.visit(`/grupo/1`);
    cy.wait(500);
    cy.get(
      `[data-testid=card11] > .css-k008qs > .css-9inm42 > .css-1h2ko5 > .css-1vy8dd4`
    ).should((id) => {
      expect(id).to.exist;
    });
    cy.get(
      '[data-testid="card11"] > .css-8af25m > .css-0 > .chakra-button'
    ).click();
    cy.get(
      `[data-testid=card11] > .css-k008qs > .css-9inm42 > .css-1h2ko5 > .css-1vy8dd4`
    ).should((id) => {
      expect(id).to.not.exist;
    });
  });
  it("Deleta heroi do grupo apos ser adicionado", () => {
    cy.visit(`/grupo/1`);
    cy.wait(500);
    cy.get(
      '[data-testid="heroi1"] > :nth-child(9) > .css-k008qs > .css-13o6z6d > .chakra-button'
    ).click();

    cy.get(
      ":nth-child(3) > .css-wx11h0 > .css-121kum4 > .css-k008qs > .css-9inm42 > .css-1h2ko5 > .css-1vy8dd4 > .chakra-heading"
    ).should((card) => {
      expect(card).to.exist;
    });

    cy.get(
      ":nth-child(3) > .css-wx11h0 > .css-121kum4 > .css-8af25m > .css-0 > .chakra-button"
    ).click();

    cy.get(
      ":nth-child(3) > .css-wx11h0 > .css-121kum4 > .css-k008qs > .css-9inm42 > .css-1h2ko5 > .css-1vy8dd4 > .chakra-heading"
    ).should((card) => {
      expect(card).to.not.exist;
    });
  });
});
