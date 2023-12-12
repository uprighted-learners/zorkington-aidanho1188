class Player {
  constructor(inventory, status = "startRoom") {
    this.inventory = inventory;
    this.status = status; // current location?
  }

  // test passed
  read = (item) => { console.log(item.getDescription()); }; 

  // test passed
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

  // test passed
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

  // how to make this talk to index.js?
  go = (locationStates, locationLookUp) => {
    if (locationStates[locationCurrent].includes(newLocation)) {
      locationCurrent = newLocation;
      console.log(locationLookUp[locationCurrent].description);
    } else {
      console.log(`You can't move from ${locationCurrent} to ${newLocation}`);
    }
  };

  // test passed
  i = () => {
    console.log("Inventory: ");
    this.inventory.forEach(item => {
      // TODO: make it print all on one line
      console.log(`${item.name}`);
    });
  };
}
exports.Player = Player;
