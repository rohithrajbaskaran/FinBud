describe('Dashboard E2E', () => {
  beforeEach(() => {
    cy.login(); // Custom command for authentication
    cy.visit('/dashboard');
  });

  it('should display financial summary', () => {
    cy.get('.financial-summary')
      .should('exist')
      .within(() => {
        cy.get('.income').should('exist');
        cy.get('.expenses').should('exist');
        cy.get('.balance').should('exist');
      });
  });

  it('should handle transaction creation', () => {
    cy.get('[data-testid="add-transaction"]').click();
    cy.get('[data-testid="amount-input"]').type('100');
    cy.get('[data-testid="category-select"]').select('Food');
    cy.get('[data-testid="submit-transaction"]').click();
    
    cy.get('.transaction-table')
      .should('contain', 'Food')
      .and('contain', '$100.00');
  });
}); 