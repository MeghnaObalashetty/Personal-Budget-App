/* global cy */
//E2E test case for login component using Cypress
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('https://meghna-budget.netlify.app') // Assuming the homepage URL is '/'
  });

  it('renders correctly', () => {
    cy.contains('Welcome to the Personal Budget App!');
    cy.get('.home-container').should('exist');
  });

  it('displays login/signup message when not logged in', () => {
    // Assuming not logged in by default
    cy.contains('Please log in or signup to access dashboard and charts.');
  });
  //E2E test case for login
  describe('Navigation to Login Page', () => {
    it('should navigate to the login page when clicking the login link', () => {
      cy.visit('https://meghna-budget.netlify.app'); // Load your application, assuming '/' is your homepage
  
      // Find the link element by its class and text content
      cy.get('li.nav-item a.nav-link')
        .contains('LOGIN')
        .click();
      
        
      // Assert the URL to ensure navigation to the login page
      cy.url().should('include', '/login');
      cy.get('input[name="email"]').type('abc@gmail.com');
      cy.get('input[name="password"]').type('Qwerty2023');
  
      cy.get('button[type="submit"]').click();
  
      // Assert that the user is navigated to the "/home" page after successful login
      cy.url().should('include', '/home');
    });
  });
});
