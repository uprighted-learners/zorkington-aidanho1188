describe('Zorkington Game Go Command', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500')
  })

  afterEach(() => {
    cy.reload()
  })

  it('should display a message when moving to a room', () => {
    cy.solveLockpad()
    cy.get('input').type('go outside{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You moved to .*... 🚶‍♂️/)
  })

  it('should display a message when moving to a room that does not exist', () => {
    cy.get('input').type('go{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /No room selected! 🚫/)
  })

  it('should display a message when moving to a room that is not valid', () => {
    cy.get('input').type('go home{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Room does not exist! 🚫/)
  })

  it('should display a message when moving to a room that is not unlocked', () => {
    cy.get('input').type('go church{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /Please solve the puzzle first! 🧩/)
  })

  it('should display a message when moving to a room that is not valid and not unlocked', () => {
    cy.solveLockpad()
    cy.get('input').type('go altar{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You can't move to this room! 🚫/)
  })
})
