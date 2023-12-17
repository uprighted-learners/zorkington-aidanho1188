class Player {
  constructor(inventory = [], location = "startRoom") {
    this._inventory = inventory;
    this._location = location;
  }

  get inventory() {
    return this._inventory;
  }

  set location(newLocation) {
    this._location = newLocation;
  }
  
  get location() {
    return this._location;
  }
}
exports.Player = Player;
