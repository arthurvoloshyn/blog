describe('Routing', () => {
  describe('user NOT authorized', () => {
    it('Home page should open', () => {
      cy.visit('');
      cy.getByTestId('MainPage').should('exist');
    });
    it('Should redirect to the main page when trying to visit the route for authorized users only', () => {
      cy.visit('articles');
      cy.getByTestId('MainPage').should('exist');
    });
    it('Should redirect to ErrorPage when trying to visit a non-existent route', () => {
      cy.visit('gdfgdfh');
      cy.getByTestId('NotFoundPage').should('exist');
    });
  });
  describe('User Authorized', () => {
    beforeEach(() => {
      cy.login();
    });
    it('Navigates to the articles page', () => {
      cy.visit('articles');
      cy.getByTestId('ArticlesPage').should('exist');
    });
    it('Go opens profile page', () => {
      cy.visit('profile/4');
      cy.getByTestId('ProfilePage').should('exist');
    });
  });
});
