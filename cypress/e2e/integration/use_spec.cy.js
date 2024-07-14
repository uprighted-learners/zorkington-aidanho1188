describe('Use Item Error Test ', () => {
  it('should display an error message when using an item without puzzle prompt', () => {
    cy.solveLockpad()
    cy.get('input').type('go basement one{enter}')
    cy.get('input').type('take key{enter}')
    cy.get('input').type('go church{enter}')
    cy.get('input').type('use key{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You can't use this item here. 🔄/)
  })

  it('should display an error message when using an item without selecting an item', () => {
    cy.get('input').type('use{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /No item selected! 🚫/)
  })

  it('should display an error message when using an item selecting an empty spaces as item', () => {
    cy.get('input').type('use   {enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /No item selected! 🚫/)
  })

  it('should display an error message when using a nonexistence item', () => {
    cy.get('input').type('use nonexistenceItem{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Item not found. Please try again. 🔄/)
  })

  it('should display an error message when using an item that is not available', () => {
    cy.solveLockpad()
    cy.get('input').type('use key{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You don't have access to this item. 🚫/)
  })
})
