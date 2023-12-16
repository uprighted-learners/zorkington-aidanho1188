class Item {
  constructor(name, description, location, isTakeable) {
    this._name = name;
    this._description = description;
    this._location = location;
    this._isTakeable = isTakeable;
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
}
exports.Item = Item;
