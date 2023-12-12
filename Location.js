// TODO: this class should talk to all classes and index.js
class Location {
  constructor(name, description, inventory, connection, isUnlocked) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.connection = connection;
    this.isUnlocked = isUnlocked;
  }

  getDescription = () => { return this.description; };
  getAvailableItems = () => { return this.inventory; };
}
exports.Location = Location;
