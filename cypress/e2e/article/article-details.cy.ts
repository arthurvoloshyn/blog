let articleId = '';

describe('User opens an article page', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((body) => {
      articleId = body.id;
      cy.visit(`articles/${body.id}`);
    });
  });

  afterEach(() => {
    cy.removeArticle(articleId);
  });

  it('And the test article opens', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });
  it('And sees a list of recommendations', () => {
    cy.getByTestId('RecommendArticles').should('exist');
  });
  it('And leaves a comment', () => {
    const text = 'test comment for e2e';
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddNewCommentForm').scrollIntoView();
    cy.addComment(text);
    cy.getByTestId(`CommentCard.${text}`).should('exist');
  });
  it('And leaves a review', () => {
    const rateCount = 4;
    const feedback = 'good article';

    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('ArticleRateCard').scrollIntoView();
    cy.addRate(rateCount, feedback);
    cy.get('[data-selected=true]').should('have.length', rateCount);
  });
  it('And puts a grade, example with stab (fixture)', () => {
    const rateCount = 4;
    const feedback = 'good article';

    cy.intercept('GET', '**/articles/*', { fixture: 'articleDetails.json' });

    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('ArticleRateCard').scrollIntoView();
    cy.addRate(rateCount, feedback);
    cy.get('[data-selected=true]').should('have.length', rateCount);
  });
});
