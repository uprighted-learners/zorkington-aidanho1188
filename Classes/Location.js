class Location {
  constructor(name, description1, description2, inventory, isUnlocked = false) {
    this._name = name;
    this._description1 = description1;
    this._description2 = description2;
    this._inventory = inventory;
    this._isUnlocked = isUnlocked;
  }

  set inventory(item) {
    return this._inventory.push(item);
  }
  
  set isUnlocked(newState) {
    this._isUnlocked = newState;
  }

  get name() {
    return this._name;
  }

  get description1() {
    return this._description1;
  }

  get description2() {
    return this._description2;
  }
  
  get inventory() {
    return this._inventory;
  }

  get isUnlocked() {
    return this._isUnlocked;
  }
}
exports.Location = Location;
