// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ? puzzle solving commands
Cypress.Commands.add('solveLockpad', () => {
  cy.get('input').type('go church{enter}')
  cy.get('input').type('12345{enter}')
})

Cypress.Commands.add('solveGrandDoor', () => {
  cy.get('input').type('go door{enter}')
  cy.get('input').type('1999{enter}')
})

Cypress.Commands.add('solveHiddenPassage', () => {
  cy.get('input').type('go passage{enter}')
  cy.get('input').type('0981{enter}')
})

Cypress.Commands.add('solveOldAltar', () => {
  cy.get('input').type('go altar{enter}')
  cy.get('input').type('In shadows bound, secrets unchain. Speak the words to unveil the path.{enter}')
})

// ? start game
Cypress.Commands.add('start', () => {
  cy.get('input').type('start{enter}')
})
