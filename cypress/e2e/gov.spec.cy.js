describe("gov", () => {
    // CHECK FOR GOV HTTP PROTOCOL AVAILABILITY:
    it("visit gov page - with HTTP - should redirect: 301", () => {
        cy.visit("http://www.gov.pl");
    })
    
    // CHECK FOR GOV HTTPS PROTOCOL AVAILABILITY:
    it("visit gov page - with HTTPS", () => {
        cy.visit("https://www.gov.pl");
    })
    
    // CHECK IF PAGE CONTENT LOAD SUCCESSFULLY:
    it("gov page - check page title - expected: Portal Gov.pl", () => {
        cy.visit("https://www.gov.pl");
        cy.title().should('include', 'Portal Gov.pl');
    })
    
    // CHECK IF PAGE CONTENT LOAD SUCCESSFULLY:
    it("gov page - check if content loaded", () => {
        cy.visit("https://www.gov.pl");
        cy.get('span').should('include.text', 'Pomoc prawna');
    })

    // CHECK SUBPAGES:
    it("gov page - check tab click", () => {
        cy.visit("https://www.gov.pl");
        const tabs = ['citizens', 'business', 'officials', 'farmer'];
        tabs.forEach(tab => {
            checkSubpageChange(tab);
        });
    })

    // CHECK FOR SEARCH FORM:
    it("gov page - check search form functionality", () => {
        cy.visit("https://www.gov.pl");
        cy.get("#query").type("podpis elektroniczny");
        cy.get('button[type="submit"]').click();
        cy.get('.search__counter').should('include.text', 'Znaleziono wyników:');
    })

    // CHECK FOR EXCHANGE CALCULATOR:
    it("gov page - exchange calculator", () => {
        cy.visit("https://www.podatki.gov.pl/kalkulatory-podatkowe/kalkulator-walut/");
        cy.get("#quota").type("100");
        cy.get('[aria-owns="bs-select-1"]').click();
        cy.get('#bs-select-1-1').click();
        cy.get('[aria-owns="bs-select-2"]').click();
        cy.get('#bs-select-2-2').click();
        cy.get('#query-date').type("14-12-2023");
        cy.get('#search-submit').click();
        cy.get('#search-result-calculated').should('include.text', '23,23 EUR');
    })
})

function checkSubpageChange(subpageLinkId){
    // CLICK PARAMETRIZED LINK:
    cy.get(`#${subpageLinkId}-tab`).click();
    // LISTEN FOR ATTRIBUTES CHANGE:
    cy.get(`#${subpageLinkId}-tab`).should('have.class', 'active');
    // LISTEN FOR TAB CONTAINER CONTENT CHANGE:
    cy.get(`#services-${subpageLinkId}`).should('have.class', 'active');
}