/// <reference types="Cypress" />

describe("Handles Errors", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
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
  it("validates period", () => {
    cy.wait(["@getQuarters", "@getFacilities"]);
    cy.get("[data-testid=migration-btn]").click();
  });
  it("validates program", () => {
    cy.wait(["@getQuarters", "@getFacilities"]);
    cy.get("[data-testid=migration-btn]").click();
    cy.get("[data-testid=errors-container]").contains(
      /Select at least one program/
    );
  });
  it("validates description", () => {
    cy.wait(["@getQuarters", "@getFacilities"]);
    cy.get("[data-testid=migration-btn]").click();
    cy.get("[data-testid=errors-container]").contains(
      /Provide a proper description/
    );
  });
});
