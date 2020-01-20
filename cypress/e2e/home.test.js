describe('Home checks', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
  });

  it('has the example title', () => {
    cy.queryByText(/Awesome/i).should('exist');
  });
});
