// * current room
//   * room descriptions (immutable)
//   * room connections (immutable)
//   * room inventory (mutable)
// * current player
//   * player inventory (mutable)
//   * player status (mutable)
// * Main game functions
// * helper functions
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
