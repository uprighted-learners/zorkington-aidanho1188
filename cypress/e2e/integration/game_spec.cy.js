describe('Zorkington Game', () => {
  it('should accept user input and display output', () => {
    cy.visit('http://localhost:5500')

    cy.get('input').type('look{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /On the door is a handwritten "sign"\./)
  })
})
