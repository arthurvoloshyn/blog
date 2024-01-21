let profileId = '';

describe('Profile Edit Test', () => {
  beforeEach(() => {
    cy.login().then((body) => {
      profileId = body.id;
      cy.visit(`/profile/${body.id}`);
    });
  });

  afterEach(() => {
    cy.profileReset(profileId);
  });
  it('Check if the profile page was successfully navigated to', () => {
    cy.getByTestId('ProfileCard.first').should('have.value', 'Test');
    cy.getByTestId('ProfileCard.lastname').should('have.value', 'User');
  });
  it('Test Profile Edit', () => {
    const firstname = 'new Test User';
    const lastname = 'new User';
    cy.profileUpdate(firstname, lastname);
    cy.getByTestId('ProfileCard.first').should('have.value', firstname);
    cy.getByTestId('ProfileCard.lastname').should('have.value', lastname);
  });
});
