describe('Zorkington Game Read Command', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500')
  })

  it('should display a message when reading an item in the room', () => {
    cy.get('input').type('read sign{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Welcome to the Mystical Church of Wonders/)
  })

  it('should display a message when reading an item in the inventory', () => {
    cy.get('input').type('go church{enter}')
    cy.get('input').type('12345{enter}')
    cy.get('input').type('take paper{enter}')
    cy.get('input').type('read paper{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /A spell scroll with intricate symbols/)
  })
})
