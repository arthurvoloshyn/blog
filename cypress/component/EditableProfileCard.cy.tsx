import { EditableProfileCard } from '@/features/EditableProfileCard';
import { TestProvider } from '@/shared/lib/tests/ComponentRender/ComponentRender';

const userId = '4';

describe('EditableProfileCard.cy.ts', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });

    cy.mount(
      <TestProvider
        options={{
          initialState: {
            user: {
              authData: {
                id: userId,
              },
            },
          },
        }}
      >
        <EditableProfileCard id={userId} />
      </TestProvider>
    );
  });

  it('Checking if you have successfully navigated to the profile page', () => {
    cy.getByTestId('ProfileCard.first').should('have.value', 'Test');
    cy.getByTestId('ProfileCard.lastname').should('have.value', 'User');
  });
});
