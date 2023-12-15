class Location {
  constructor(name, description, inventory, isUnlocked) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.isUnlocked = isUnlocked;
  }

  set isUnlocked(newState) {
    this.isUnlocked = newState;
  }

  get name() {
    return this.name;
  }

  get description() {
    return this.description;
  }

  get isUnlocked() {
    return this.isUnlocked;
  }

  get inventory() {
    return this.inventory;
  }
}
exports.Location = Location;
