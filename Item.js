class Item {
  constructor(name, description, location, isTakeable) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.isTakeable = isTakeable;

  }
  getDescription = () => { return this.description; };
  getIsTakeable = () => { return this.isTakeable; };
}
exports.Item = Item;
