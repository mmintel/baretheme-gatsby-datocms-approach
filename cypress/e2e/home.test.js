describe('Home checks', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForRouteChange();
  });

  it('has the example title', () => {
    cy.queryByText(/Awesome/i).should('exist');
  });
});
