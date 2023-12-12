const readline = require("readline");
const fs = require("fs");
const { Item } = require("./Item");
const { Location } = require("./Location");
const roomsJsonData = fs.readFileSync("roomsList.json");
const itemsJsonData = fs.readFileSync("itemsList.json");
const rooms = JSON.parse(roomsJsonData);
const items = JSON.parse(itemsJsonData);
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

class Player {
  constructor(inventory, status = "startRoom") {
    this.inventory = [];
    this.status = status; // current location?
  }
  // player actions functions
  read = (item) => { console.log(item.getDescription()); } // should I move this to the Item class? and check for item if it has this property? then use it?

  // test passed
  take = (item) => { this.inventory.push(item); }

  // test passed
  drop = (dropItem) => {
    for (let i = 0; i < this.inventory.length; i++) {
      if( this.inventory[i] === dropItem){
        console.log(`You dropped ${dropItem}`)
        this.inventory.splice(i, 1);
      }
    }
  }

  use = (item) => {
    if(this.inventory.hasOwnProperty(item) ){
      // item object must pass in the parameter for us to check for its description
    }
  }

  go = (newLocation) => {
    if (locationStates[locationCurrent].includes(newLocation)){
      locationCurrent = newLocation;
      console.log(locationLookUp[locationCurrent].description);
    } else {
      console.log(`You can't move from ${locationCurrent} to ${newLocation}`);
    }
  }

  // test passed
  i = () => {
    console.log(`You open your inventory and it has ${this.inventory}`);
  }
}

const startRoom = new Location(rooms[0].name, rooms[0].description, rooms[0].inventory);
const room1 = new Location(rooms[1].name, rooms[1].description, rooms[1].inventory);
const room2 = new Location(rooms[2].name, rooms[2].description, rooms[2].inventory);
const room3 = new Location(rooms[3].name, rooms[3].description, rooms[3].inventory);
const room4 = new Location(rooms[4].name, rooms[4].description, rooms[4].inventory);

const sign = new Item(items[0].name, items[0].description, items[0].location, items[0].isTakeable);

//  state machine
let locationCurrent = "startRoom";

let locationLookUp = {
  startRoom : startRoom,
  room1: room1,
  room2: room2,
  room3: room3,
  room4: room4
}

let locationStates = {
  startRoom : [room1, room2, room3, room4],
  room1: [startRoom],
  room2: [startRoom],
  room3: [startRoom],
  room4: [startRoom]
}

// is this a good name?
let objectLookUp = {
  sign: sign
}

start();

async function start() {
  const player = new Player();
  const welcomeMessage = startRoom.getDescription();
  console.log(welcomeMessage);
  await prompt(player, "");
  process.exit();
}

function interact(player, command, target) {
  if (player.hasOwnProperty(command)) {
    player[command](target);
  } else {
    console.log(`I don't know "${command}" command.`)
  }
}

// TODO: Locked Out
// **Given** the player is in the `starting room`
// **When** the player attempts to enter a new room
// **Then** the game denies the player
// >_open door
// The door is locked. There is a keypad on the door handle.
function isLocked(room){
  return room.isLocked;
}

// TODO: Speak friend and enter
// **Given** the player is in the `starting room`
// **When** the player solves a puzzle (e.g. enters a correct password)
// **Then** the game allows the player to enter the `next room`
// >_enter code 12345
// Success! The door opens.
// You enter the foyer and the door shuts behind you.
// **And** the player moves into the `next room`
function isSolved(password) {
  // state machine again...
}

// TODO: Unauthorized Access
// **Given** the player is in the `starting room`
// **When** the player fails the puzzle (e.g. enters the incorrect password)
// **Then** the game denies the player entry
// >_enter code 00000
// Bzzzzt! The door is still locked.
// **And** the player remains in the `starting room`
function isIncorrectPassword(password) {
  // state machine, look up location and location password
}


// Foyer (not tested yet)
// **Given** the player is in the `next room`
// **Then** the game displays a description, with at least one (takeable) item in said description
// You are in a foyer. Or maybe it's an antechamber. 
// Or a vestibule. 
// Or an entryway. 
// Or an atrium. 
// Or a narthex. 
// But let's forget all that fancy vocabulary, and just call it a foyer.
// Anyways, it's definitely not a mudroom. 
// A copy of the local paper lies in a corner.
function displayRoom(room) {
  console.log(room.getDescription()); 
  console.log(room.getAvailableItems());
}

// TODO: Display Inventory
// **Given** an item is in the player's 'inventory'
// **When** the player types `i` or `inventory` or `take inventory`
// **Then** the game displays the player's `inventory`
// You are carrying:
// A copy of the local paper
function displayInventory(){
  return console.log(Player.inventory);
}

// TODO: Keep Doors Open
// **Given** you have unlocked a door
// **When** you try and open the door again
// **Then** the door should still be unlocked, and allow you to pass to the next room
function unlocked(door) { // pass location into "door"
  // state machines 
  return door.isUnlocked === false;
}

// TODO: Create More Rooms
// Create at least 4 more rooms, with their own connections, puzzles, and/or inventories
// Each room should have:
// * A limited number of other rooms it connects to (you can't move directly between some rooms without going through others)
// * A unique description
// * A separate Inventory (the inventory can be empty)
// * Optionally you can add more puzzles, locked doors, and interactive items


// from README.md
async function prompt(player, answer) {
  while (answer !== "exit") {
    answer = await ask(">_ ");
    if (answer === "exit") {
      break;
    }
    // more logic here
    // if answer contains command, go to command
    let input = answer.trim().split(" ");
    let command = input[0].toLowerCase();
    let item = input[1];
    if(objectLookUp.hasOwnProperty(item)){
      item = objectLookUp[item];
      interact(player, command, item);  // we should pass item object in here? like sign as an item so player can interact with it
    }
  }
}
