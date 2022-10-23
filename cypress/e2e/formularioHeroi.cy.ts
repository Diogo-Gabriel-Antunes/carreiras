describe("Teste formulario", () => {
  it("Verifica se existe todos inputs necessarios e estao com o campo vazio", () => {
    cy.visit("/novoheroi");
    cy.get("input").should("have.length", 23);
    cy.get('[name="name"]').should("have.value", "");
    cy.get('[name="full-name"]').should("have.value", "");
    cy.get('[name="alter-egos"]').should("have.value", "");
    cy.get('[name="aliases"]').should("have.value", "");
    cy.get('[name="place-of-birth"]').should("have.value", "");
    cy.get('[name="first-appearance"]').should("have.value", "");
    cy.get('[name="publisher"]').should("have.value", "");
    cy.get('[name="alignment"]').should("have.value", "");
    cy.get('[name="gender"]').should("have.value", "");
    cy.get('[name="race"]').should("have.value", "");
    cy.get('[name="height"]').should("have.value", "");
    cy.get('[name="weight"]').should("have.value", "");
    cy.get('[name="eye-color"]').should("have.value", "");
    cy.get('[name="hair-color"]').should("have.value", "");
    cy.get('[name="occupation"]').should("have.value", "");
    cy.get('[name="base"]').should("have.value", "");
    cy.get('[name="group-affiliation"]').should("have.value", "");
    cy.get('[name="relatives"]').should("have.value", "");
    cy.get('[name="intelligence"]').should("have.value", 0);
    cy.get('[name="strength"]').should("have.value", 0);
    cy.get('[name="speed"]').should("have.value", 0);
    cy.get('[name="durability"]').should("have.value", 0);
    cy.get('[name="combat"]').should("have.value", 0);
    cy.get('[name="url"]').should("have.value", "");
  });

  it("Veficia validacao esta correta", () => {
    cy.visit("/novoheroi");
    cy.get("p[class = 'errorname']").should((p) => expect(p).to.have.length(0));
    cy.get("p[class = 'errorurl']").should((p) => expect(p).to.have.length(0));
    cy.get("p[class = 'errorstrength']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'errocombat']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'errodurability']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'errointelligence']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'erropower']").should((p) => expect(p).to.have.length(0));
    cy.get("p[class = 'errospeed']").should((p) => expect(p).to.have.length(0));
    cy.get("p[class = 'errofull-name']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'erroaliases']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'erroalignment']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'erroalter-egos']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'errofirst-appearance']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'erroplace-of-birth']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'erropublisher']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'errogender]'").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'erroweight']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'errorace']").should((p) => expect(p).to.have.length(0));
    cy.get("p[class = 'errohair-color']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'erroeye-color']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'errooccupation]'").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'errorelatives']").should((p) =>
      expect(p).to.have.length(0)
    );
    cy.get("p[class = 'errogroup-affiliation']").should((p) =>
      expect(p).to.have.length(0)
    );

    cy.get("[value='Cadastrar']").click();

    cy.get("p[class ='errorname']").should(
      "have.text",
      "Deve conter ao menos 3 caracteres"
    );

    cy.get("p[class = 'errorfull-name']").should(
      "have.text",
      "Deve conter ao menos 3 caracteres"
    );

    cy.get("p[class = 'erroralignment']").should(
      "have.text",
      "Este campo é obrigatorio"
    );

    cy.get("p[class = 'errorfirst-appearance']").should(
      "have.text",
      "Deve conter ao menos 5 caracteres"
    );
    cy.get("p[class = 'errorplace-of-birth']").should(
      "have.text",
      "Deve conter ao menos 5 caracteres"
    );
    cy.get("p[class = 'errorpublisher']").should(
      "have.text",
      "Deve conter ao menos 3 caracteres"
    );
    cy.get("p[class = 'errorgender']").should(
      "have.text",
      "Este campo é obrigatorio"
    );

    cy.get("p[class = 'errorrace']").should(
      "have.text",
      "Deve conter ao menos 2 caracteres"
    );
    cy.get("p[class = 'errorhair-color']").should(
      "have.text",
      "Este campo é obrigatorio"
    );
    cy.get("p[class = 'erroreye-color']").should(
      "have.text",
      "Deve conter ao menos 5 caracteres"
    );
  });
  it("Teste formulario com heroi", () => {
    const min = 1;
    const max = 731;
    const id = (Math.random() * (max - min) + min).toFixed(0);

    cy.visit(`/herois/${id}`);
    cy.request(
      `https://www.superheroapi.com/api.php/5542175775874258/${id}`
    ).then((resposta) => {
      cy.get('[name="name"]').should("have.value", resposta.body.name);
      cy.get('[name="full-name"]').should(
        "have.value",
        resposta.body.biography["full-name"]
      );
      cy.get('[name="alter-egos"]').should(
        "have.value",
        resposta.body.biography["alter-egos"]
      );
      cy.get('[name="aliases"]').should(
        "have.value",
        resposta.body.biography.aliases[0]
      );
      cy.get('[name="place-of-birth"]').should(
        "have.value",
        resposta.body.biography["place-of-birth"]
      );
      cy.get('[name="first-appearance"]').should(
        "have.value",
        resposta.body.biography["first-appearance"]
      );
      cy.get('[name="publisher"]').should(
        "have.value",
        resposta.body.biography.publisher
      );
      cy.get('[name="alignment"]').should(
        "have.value",
        resposta.body.biography.alignment
      );
      cy.get('[name="gender"]').should(
        "have.value",
        resposta.body.appearance.gender
      );
      cy.get('[name="race"]').should(
        "have.value",
        resposta.body.appearance.race
      );
      cy.get('[name="height"]').should(
        "have.value",
        resposta.body.appearance.height[1].substring(0, 3)
      );
      cy.get('[name="weight"]').should(
        "have.value",
        resposta.body.appearance.weight[1].substring(0, 3)
      );
      cy.get('[name="eye-color"]').should(
        "have.value",
        resposta.body.appearance["eye-color"]
      );
      cy.get('[name="hair-color"]').should(
        "have.value",
        resposta.body.appearance["hair-color"]
      );
      cy.get('[name="occupation"]').should(
        "have.value",
        resposta.body.work.occupation
      );
      cy.get('[name="base"]').should("have.value", resposta.body.work.base);
      cy.get('[name="group-affiliation"]').should(
        "have.value",
        resposta.body.connections["group-affiliation"]
      );
      cy.get('[name="relatives"]').should(
        "have.value",
        resposta.body.connections.relatives
      );
      cy.get('[name="intelligence"]').should(
        "have.value",
        resposta.body.powerstats.intelligence
      );
      cy.get('[name="strength"]').should(
        "have.value",
        resposta.body.powerstats.strength
      );
      cy.get('[name="speed"]').should(
        "have.value",
        resposta.body.powerstats.speed
      );
      cy.get('[name="durability"]').should(
        "have.value",
        resposta.body.powerstats.durability
      );
      cy.get('[name="combat"]').should(
        "have.value",
        resposta.body.powerstats.combat
      );
      cy.get('[name="url"]').should("have.value", resposta.body.image.url);
    });
  });
});
