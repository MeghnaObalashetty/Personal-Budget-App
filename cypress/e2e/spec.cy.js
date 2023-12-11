/* global cy */

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('https://meghna-budget.netlify.app/') // Assuming the homepage URL is '/'
  });

  it('renders correctly', () => {
    cy.contains('Welcome to the Personal Budget App!');
    cy.get('.home-container').should('exist');
  });

  it('displays login/signup message when not logged in', () => {
    // Assuming not logged in by default
    cy.contains('Please log in or signup to access dashboard and charts.');
  });

});
//E2E test case for login
describe('Login Component Tests', () => {
  it('successfully logs in with correct credentials', () => {
    cy.visit('https://meghna-budget.netlify.app/login'); // Replace with your app's URL

    cy.get('input[name="email"]').type('abc@gmail.com');
    cy.get('input[name="password"]').type('Qwerty2023');

    cy.get('button[type="submit"]').click();

    // Assert that the user is navigated to the "/home" page after successful login
    cy.url().should('include', '/home');
  });

  it('displays error message with incorrect credentials', () => {
    cy.visit('https://meghna-budget.netlify.app/login'); // Replace with your app's URL

    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');

    cy.get('button[type="submit"]').click();

    // Assert that error message is displayed on incorrect login attempt
    cy.contains('No matching record exists. Please verify your email and password.')
      .should('be.visible');
  });
});
