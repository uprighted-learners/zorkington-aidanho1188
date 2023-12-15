class Player {
  constructor(inventory= [], location = "startRoom") {
    this.inventory = inventory;
    this.location = location;
  }

  takeItem = (item) => {
    this.inventory.push(item); 
    console.log(`You take the ${item.name}.`);
  }

  dropItem = (Item) => {
    const itemIndex = this.inventory.indexOf(dropItem);
    this.inventory.splice(itemIndex, 1);
    console.log(`You dropped ${dropItem}`);
  };

  hasItem = (item) => {
    if (this.inventory.hasOwnProperty(item)) {
      return true;
    }
    return false;
  };

  setLocation = (newLocation) => {
    this.location = newLocation;
  }

  getLocation = () => {
    return this.location;
  }

  getInventory = () => {
    console.log("Inventory: ", this.inventory.map(item => item.name));
  };
}
exports.Player = Player;
