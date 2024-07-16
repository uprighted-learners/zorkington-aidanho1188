describe('Look Error Test', () => {
  it('should display an invalid error when used with an argument', () => {
    cy.get('input').type('look room{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /Please try with just "look". 🔄/)
  })
})

describe('Look Test: Starting Room', () => {
  it('should have the current room name from output', () => {
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /Main Street/)
  })

  it("should display the room' items", () => {
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /Available items: sign/)
  })

  it('should display the room description', () => {
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten /)
  })
})

describe('Look Test:Church', () => {
  beforeEach(() => {
    cy.solveLockpad()
  })

  it('should have the current room name from output', () => {
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /Church/)
  })

  it("should display the room's items", () => {
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /Available items: paper/)
  })

  it("should display the room's items list after user take an item", () => {
    cy.get('input').type('take paper{enter}')
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /Available items: /)
  })

  it("should display the room' items list after drop an item", () => {
    cy.get('input').type('take paper{enter}')
    cy.get('input').type('drop paper{enter}')
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /Available items: paper/)
  })

  it('should display the room description', () => {
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You stand within the sacred walls of the church, soft candlelight casts shadows on ornate stained glass./)
  })
})

describe('Look Test: Floor 1', () => {
  beforeEach(() => {
    cy.solveLockpad()
  })

  it('should have the current room name from output', () => {
    cy.solveGrandDoor()
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /Floor One/)
  })

  it("should display the room's items", () => {
    cy.solveGrandDoor()
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /Available items: shadow amulet/)
  })

  it("should display the room's items list after user take an item", () => {
    cy.solveGrandDoor()
    cy.get('input').type('take amulet{enter}')
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /Available items: /)
  })

  it("should display the room' items list after drop an item", () => {
    cy.get('input').type('take paper{enter}')
    cy.solveGrandDoor()
    cy.get('input').type('take amulet{enter}')
    cy.get('input').type('drop amulet{enter}')
    cy.get('input').type('drop paper{enter}')
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .eq(-3)
      .invoke('text')
      .should('match', /Available items: shadow amulet, paper/)
  })

  it('should display the room description', () => {
    cy.solveGrandDoor()
    cy.get('input').type('look{enter}')
    cy.get('.output')
      .last()
      .invoke('text')
      .should('match', /You find yourself on the first floor of the building. The air is filled with a quiet hum, and soft footsteps echo in the distance./)
  })
})
