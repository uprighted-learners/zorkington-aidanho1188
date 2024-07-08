describe('Take Item Error Test ', () => {
  it('should display an error message when taking an item without selecting an item', () => {
    cy.get('input').type('take{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Please provide an item to take. 📚/)
  })

  it('should display an error message when taking an item selecting an empty spaces as item', () => {
    cy.get('input').type('take   {enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Please provide an item to take. 📚/)
  })

  it('should display an error message when taking a nonexistence item', () => {
    cy.get('input').type('take nonexistenceItem{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /This item does not exist. Please try again. 🔄/)
  })

  it('should display an error message when taking an item that is not available', () => {
    cy.get('input').type('take amulet{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You can't take this item! It doesn't exist in this room. 🔄/)
  })

  it('should display an error message when taking an item that is not takeable', () => {
    cy.get('input').type('take sign{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You are not allow to take this item. 🚫/)
  })

  it('should display an error message when taking an item that is already in the inventory', () => {
    cy.solveLockpad()
    cy.get('input').type('take paper{enter}')
    cy.get('input').type('take paper{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You already have this item in your inventory. 🚫/)
  })
})

// TODO: Need to handle on success message
describe('Take Item Test', () => {
  it('should display a success message when taking an item', () => {
    cy.solveLockpad()
    cy.get('input').type('take paper{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You took the paper. 📚/)
  })

  it('should display a success message when taking an item with a full name', () => {
    cy.solveLockpad()
    cy.get('input').type('go basement one{enter}')
    cy.get('input').type('take ornate key{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You took the key. 📚/)
  })

  it('should display a success message when taking an item with a short name', () => {
    cy.solveLockpad()
    cy.get('input').type('go basement one{enter}')
    cy.get('input').type('take key{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You took the key. 📚/)
  })

  it('should display a success message when taking the amulet', () => {
    cy.solveLockpad()
    cy.solveGrandDoor()
    cy.get('input').type('take amulet{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You took the amulet. 📚/)
  })

  it('should take the amulet and display the amulet in the inventory', () => {
    cy.solveLockpad()
    cy.solveGrandDoor()
    cy.get('input').type('take amulet{enter}')
    cy.get('input').type('i{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /amulet/)
  })

  it('should take the amulet and remove the amulet from the room', () => {
    cy.solveLockpad()
    cy.solveGrandDoor()
    cy.get('input').type('take amulet{enter}')
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('not.match', /amulet/)
  })
})
