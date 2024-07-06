export default class Player {
  constructor(inventory = [], location = 'room0') {
    this._inventory = inventory
    this._location = location
    this._answer = ''
  }

  get inventory() {
    return this._inventory
  }

  set location(newLocation) {
    this._location = newLocation
  }

  get location() {
    return this._location
  }

  set answer(input) {
    this._answer = input
  }

  get answer() {
    return this._answer
  }
}
