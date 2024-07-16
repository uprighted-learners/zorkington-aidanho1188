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

describe('Use Item Test', () => {
  it('should use the ornate key to unlock the grand church door', () => {
    cy.solveLockpad()
    cy.get('input').type('go basement one{enter}')
    cy.get('input').type('take key{enter}')
    cy.get('input').type('go church{enter}')
    cy.get('input').type('go grand door{enter}')
    cy.get('input').type('use key{enter}')
    cy.get('.output')
      .eq(-2)
      .invoke('text')
      .should('match', /You've unlocked the grand church door! 🚪/)
  })

  it('should reveal the secret passage with the amulet', () => {
    cy.solveLockpad()
    cy.solveGrandDoor()
    cy.get('input').type('take amulet{enter}')
    cy.get('input').type('go church{enter}')
    cy.get('input').type('go basement one{enter}')
    cy.get('input').type('go passage{enter}')
    cy.get('input').type('use amulet{enter}')
    cy.get('.output')
      .eq(-2)
      .invoke('text')
      .should('match', /The amulet resonates with the shadows, aligning with the theme of the puzzle. It reveals the hidden passage to a mysterious room./)
  })

  it('should open the portal with the magical artifact', () => {
    cy.solveLockpad()
    cy.get('input').type('go basement one{enter}')
    cy.solveHiddenPassage()
    cy.get('input').type('go altar{enter}')
    cy.get('input').type('burn paper{enter}')
    cy.get('input').type('In shadows bound, secrets unchain. In darkness found, the path remains.{enter}')
    cy.get('.output')
      .eq(-2)
      .invoke('text')
      .should('match', /The portal trembles and then opens, revealing the path to victory!/)
  })
})
