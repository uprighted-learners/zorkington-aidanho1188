describe('Drop Item Error Test', () => {
  it('should display an error message when dropping an item without selecting an item', () => {
    cy.get('input').type('drop{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Please provide an item to drop. 📚/)
  })

  it('should display an error message when dropping an item selecting an empty spaces as item', () => {
    cy.get('input').type('drop   {enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Please provide an item to drop. 📚/)
  })

  it('should display an error message when dropping a nonexistence item', () => {
    cy.get('input').type('drop nonexistenceItem{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /This item does not exist. Please try again. 🔄/)
  })

  it('should display an error message when dropping an item that is not in the inventory', () => {
    cy.get('input').type('drop amulet{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You can't drop this item! It doesn't exist in your inventory. 🔄/)
  })
})

describe('Drop Item Test', () => {
  it('should drop an item from the inventory', () => {
    cy.solveLockpad()
    cy.solveGrandDoor()
    cy.get('input').type('take amulet{enter}')
    cy.get('input').type('drop amulet{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You dropped the amulet. 📚/)
  })

  it('should drop an item from the inventory and add it to the room', () => {
    cy.solveLockpad()
    cy.solveGrandDoor()
    cy.get('input').type('take amulet{enter}')
    cy.get('input').type('drop amulet{enter}')
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /amulet/)
  })

  it('should drop an item from the inventory and remove it from the player inventory', () => {
    cy.solveLockpad()
    cy.solveGrandDoor()
    cy.get('input').type('take amulet{enter}')
    cy.get('input').type('drop amulet{enter}')
    cy.get('input').type('inventory{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('not.match', /amulet/)
  })
})
