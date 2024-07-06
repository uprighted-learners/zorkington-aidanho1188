describe('Zorkington Game Basic Input/Output', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500')
  })

  it('should display a welcome message', () => {
    cy.get('.output').first().invoke('text').should('contain', 'Welcome to Zorkington!')
  })

  it('should accept user input and display output', () => {
    cy.get('input').type('{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Please enter a command/)
  })

  it('should display an about message', () => {
    cy.get('input').type('about{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /This is a JavaScript game console./)
  })

  it('should display a help message', () => {
    cy.get('input').type('help{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Available commands: start, help, about, go, i, look, read, open, burn, drop, use, exit/)
  })

  it('should display a goodbye message', () => {
    cy.get('input').type('exit{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Goodbye!/)
  })
})
