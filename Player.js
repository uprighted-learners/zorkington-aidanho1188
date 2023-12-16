class Player {
  constructor(inventory = [], location = "startRoom", answer = "") {
    this._inventory = inventory;
    this._location = location;
    this._answer = answer;
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

  set answer(userInput){
    this._answer = userInput;
  }
}
exports.Player = Player;
