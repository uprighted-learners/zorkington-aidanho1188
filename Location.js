class Location {
  constructor(name, description, inventory, isUnlocked) {
    this._name = name;
    this._description = description;
    this._inventory = inventory;
    this._isUnlocked = isUnlocked;
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
}
exports.Location = Location;
