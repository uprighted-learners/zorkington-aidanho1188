class Location {
  constructor(name, description, inventory, isUnlocked, puzzle) {
    this._name = name;
    this._description = description;
    this._inventory = inventory;
    this._isUnlocked = isUnlocked;
    this._puzzle = puzzle;
  }

  set isUnlocked(newState) {
    this._isUnlocked = newState;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }
  
  get inventory() {
    return this._inventory;
  }

  get isUnlocked() {
    return this._isUnlocked;
  }

  get puzzle() {
    return this._puzzle;
  }
}
exports.Location = Location;
