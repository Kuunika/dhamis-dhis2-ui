/// <reference types="Cypress" />

describe("Migrates data", () => {
  let Periods = [];
  let periodId = 0;
  let program = "";
  let year = 2000;
  let qtr = 1;

  before(() => {
    cy.visit("localhost:3000");
    cy.getPeriods().then(res => {
      Periods = JSON.parse(res.body);
    });
  });
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/quarters/*"
    }).as("getQuarters");
    cy.route({
      method: "GET",
      url: "/api/healthfacilities/get/*"
    }).as("getFacilities");
  });
  describe("migrates data for one program", () => {
    it("inputs valid data", () => {
      cy.wait(["@getQuarters", "@getFacilities"]);

      cy.get("[data-testid=year-field]").click();
      cy.get("[data-testid=year-option]")
        .eq(1)
        .invoke("attr", "data-value")
        .then(text => {
          year = text;
        });

      cy.get("[data-testid=year-option]")
        .eq(1)
        .click();

      cy.get("[data-testid=quarter-field]").click();
      cy.get("[data-testid=quarter-option]")
        .eq(1)
        .invoke("attr", "data-value")
        .then(text => {
          qtr = text;
        });

      cy.get("[data-testid=quarter-option]")
        .eq(1)
        .click();

      cy.get("[data-testid=program-option]")
        .first()
        .click();
      cy.get("[data-testid=program-option]")
        .first()
        .invoke("attr", "data-value")
        .then(text => {
          program = text;
        });

      // http://196.216.12.28:81/api/artclinic/get/a4595012/6/
    });
    it("posts valid data", () => {
      console.log({ year, qtr, program });
      periodId = Periods.find(
        quarter => quarter.year == year && quarter.quarter == qtr
      );
      periodId = periodId ? periodId.id : null;

      cy.get("[data-testid=description-field]").type("Migrate First one");

      cy.get("[data-testid=migration-btn]").click();

      const facilitiesEndPoint = `${Cypress.env(
        "REACT_APP_DHAMIS_API_URL"
      )}/${program}/get/${Cypress.env("REACT_APP_DHAMIS_API_KEY")}/${periodId}`;
      console.log(facilitiesEndPoint);
      cy.route({
        method: "GET",
        url: `${facilitiesEndPoint}/*`
      }).as("processFacilities");

      cy.get(".swal2-confirm").click();

      cy.wait(["@processFacilities"]).then(r => {
        console.log(r);
      });
    });
  });
});
