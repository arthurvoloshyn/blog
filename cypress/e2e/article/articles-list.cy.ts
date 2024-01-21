describe('Testing the articles page', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('articles');
  });
  it('User visits articles page', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });
  it('And Sorts by views, order, search string and category', () => {
    const sort = 'views';
    const order = 'desc';
    const search = 'java';
    const tabValue = 'IT';

    cy.addSort({ sort, order, search, tabValue });
    cy.getByTestId('ArticlesPageSort.sort').should('have.value', sort);
    cy.getByTestId('ArticlesPageSort.order').should('have.value', order);
    cy.getByTestId('ArticlesPageSearch').should('have.value', search);
    cy.getByTestId(`Tab-${tabValue}`).should('have.text', 'Айти');
  });

  it('testing the list of articles without loading from the server (fixture)', () => {
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });
});
