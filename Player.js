class Player {
  constructor(inventory= [], location = "startRoom") {
    this.inventory = inventory;
    this.location = location;
  }

  read = (item) => { console.log(item.getDescription()); }; 

  take = (item) => { 
    try {
      if(item.isTakeable){
        this.inventory.push(item); 
        console.log(`You take the ${item.name}.`);
        // TODO: we should remove this item from item list after taking it
      } else {
        throw error();
      }
    } catch (error) {
      console.log(`I can't take this item!`);
    }
  };

  drop = (dropItem) => {
    for (let i = 0; i < this.inventory.length; i++) {
      if (this.inventory[i] === dropItem) {
        console.log(`You dropped ${dropItem}`);
        this.inventory.splice(i, 1);
      }
    }
  };

  use = (item) => {
    if (this.inventory.hasOwnProperty(item)) {
      // item object must pass in the parameter for us to check for its description
    }
  };

  changeLocation = (newLocation) => {
    this.status = newLocation;
  }

  getLocation = () => {
    return this.location;
  }

  i = () => {
    console.log("Inventory: ", this.inventory.join);
  };
}
exports.Player = Player;
