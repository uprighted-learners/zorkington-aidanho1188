class Item {
  constructor(name, description, location, isTakeable) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.isTakeable = isTakeable;
  }

  get name() {
    return this.name;
  }

  get description() {
    return this.description;
  }

  get location() {
    return this.location;
  }

  get isTakeable() {
    return this.isTakeable;
  }
}
exports.Item = Item;
