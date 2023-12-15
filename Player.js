class Player {
  constructor(inventory = [], location = "startRoom") {
    this.inventory = inventory;
    this.location = location;
  }

  get inventory() {
    return this.inventory;
  }

  set location(newLocation) {
    this.location = newLocation;
  }
  
  get location() {
    return this.location;
  }
}
exports.Player = Player;
