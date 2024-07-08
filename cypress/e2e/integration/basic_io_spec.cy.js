describe('Basic Input/Output Test', () => {
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

  it('should display invalid command message', () => {
    cy.get('input').type('asdjfklasdjfkl{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /asdjfklasdjfkl is not a valid command/)
  })
})

describe('Case Insensitive Commands Test', () => {
  it('should accept lowercase commands', () => {
    cy.get('input').type('read sign{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Welcome to the Mystical Church of Wonders!/)
  })

  it('should accept uppercase commands', () => {
    cy.get('input').type('READ SIGN{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Welcome to the Mystical Church of Wonders!/)
  })

  it('should accept mixed case commands', () => {
    cy.get('input').type('rEaD SiGn{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Welcome to the Mystical Church of Wonders!/)
  })

  it('should accept commands with extra spaces', () => {
    cy.get('input').type('  read sign  {enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Welcome to the Mystical Church of Wonders!/)
  })

  it('should accept commands with extra spaces and mixed case', () => {
    cy.get('input').type('  rEaD SiGn  {enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Welcome to the Mystical Church of Wonders!/)
  })

  it('should accept commands with extra spaces in between', () => {
    cy.get('input').type('read   sign{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Welcome to the Mystical Church of Wonders!/)
  })
})
