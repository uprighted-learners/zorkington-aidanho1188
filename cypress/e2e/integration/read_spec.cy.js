describe('Read Command Error Tests', () => {
  it('should display am error message when reading an item without selecting an item', () => {
    cy.get('input').type('read{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Please provide an item to read. 📚/)
  })

  it('should display an error message when reading an item selecting an empty spaces as item', () => {
    cy.get('input').type('read   {enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Please provide an item to read. 📚/)
  })

  it('should display an error message when reading a nonexistence item', () => {
    cy.get('input').type('read nonexistenceItem{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Item not found. Please try again. 🔄/)
  })

  it('should display an error message when reading an item that is not available', () => {
    cy.get('input').type('read amulet{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You don't have this item. 🚫/)
  })
})

describe('Read Command Tests', () => {
  it('should display a message when reading an item in the room', () => {
    cy.get('input').type('read sign{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Welcome to the Mystical Church of Wonders/)
  })

  it('should display a message when reading an item in the inventory', () => {
    cy.solveLockpad()
    cy.get('input').type('take paper{enter}')
    cy.get('input').type('read paper{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /A spell scroll with intricate symbols/)
  })

  it('should display a message when reading an item with a full name', () => {
    cy.solveLockpad()
    cy.get('input').type('go basement one{enter}')
    cy.get('input').type('read ornate key{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /An intricately crafted key with mystical symbols./)
  })

  it('should display a message when reading an item with a short name', () => {
    cy.solveLockpad()
    cy.get('input').type('go basement one{enter}')
    cy.get('input').type('read key{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /An intricately crafted key with mystical symbols./)
  })

  it('should display sign description when reading sign', () => {
    cy.get('input').type('read sign{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Welcome to the Mystical Church of Wonders!/)
  })

  it('should display paper description when reading paper', () => {
    cy.solveLockpad()
    cy.get('input').type('read paper{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /A spell scroll with intricate symbols/)
  })

  it('should display ornate key description when reading ornate key', () => {
    cy.solveLockpad()
    cy.get('input').type('go basement one{enter}')
    cy.get('input').type('read ornate key{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /An intricately crafted key with mystical symbols./)
  })

  it('should display shadow amulet description when reading shadow amulet', () => {
    cy.solveLockpad()
    cy.solveGrandDoor()
    cy.get('input').type('read shadow amulet{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /An ornate amulet with a dark gem at its center./)
  })
})
