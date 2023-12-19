class Item {
  constructor(name, description, location, isTakeable, puzzleCode = null) {
    this._name = name;
    this._description = description;
    this._location = location;
    this._isTakeable = isTakeable;
    this._puzzleCode = puzzleCode;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get location() {
    return this._location;
  }

  get isTakeable() {
    return this._isTakeable;
  }

  get puzzleCode() {
    return this._puzzleCode;
  }
}
exports.Item = Item;
