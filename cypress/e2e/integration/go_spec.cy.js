describe('Go Command Error Tests', () => {
  it('should display an error message when moving to a locked room', () => {
    cy.get('input').type('go church{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /Please solve the puzzle first! 🧩/)
  })

  it('should display an error message when moving without selecting a room', () => {
    cy.get('input').type('go{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /No room selected! 🚫/)
  })

  it('should display an error message when moving selecting an empty spaces as room', () => {
    cy.get('input').type('go  {enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /No room selected! 🚫/)
  })

  it('should display an error message when moving to an invalid room', () => {
    cy.get('input').type('go home{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Room does not exist! 🚫/)
  })

  it('should display an error message when moving to an invalid and locked room', () => {
    cy.solveLockpad()
    cy.get('input').type('go altar{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You can't move to this room! 🚫/)
  })
})

describe('Go Command Tests', () => {
  it('should display a success message when moving to a valid room', () => {
    cy.solveLockpad()
    cy.get('input').type('go outside{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You moved to .*... 🚶‍♂️/)
  })

  it('should display a success message when moving church', () => {
    cy.solveLockpad() // has "go church" command
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You moved to church... 🚶‍♂️/)
  })

  it('should display a success message when moving to floor1', () => {
    cy.solveLockpad()
    cy.solveGrandDoor() // has "go floor1" command
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You moved to floor1... 🚶‍♂️/)
  })

  it('should display a success message when moving to floor2', () => {
    cy.solveLockpad()
    cy.solveGrandDoor()
    cy.get('input').type('go floor2{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You moved to floor2... 🚶‍♂️/)
  })

  it('should display a success message when moving to basement1', () => {
    cy.solveLockpad()
    cy.get('input').type('go basement1{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You moved to basement1... 🚶‍♂️/)
  })

  it('should display a success message when moving to basement2', () => {
    cy.solveLockpad()
    cy.get('input').type('go basement1{enter}')
    cy.solveHiddenPassage() // has "go basement2" command
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You moved to basement2... 🚶‍♂️/)
  })

  it('should display a success message when moving to basement3 (altar)', () => {
    cy.solveLockpad()
    cy.get('input').type('go basement1{enter}')
    cy.solveHiddenPassage()
    cy.solveOldAltar() // has "go basement3" command
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You moved to basement3... 🚶‍♂️/)
  })
})
