class Location {
  constructor(name, description, inventory, isUnlocked) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.isUnlocked = isUnlocked;
  }

  getLocationName() { 
    return this.name;
  }

  getLocationDescription() {
    return this.description;
  }

  getLocationStatus() {
    return this.isUnlocked;
  }

  getAvailableItems() {
    console.log("Available items: ", this.inventory.map(item => item.name));
  }
}
exports.Location = Location;
