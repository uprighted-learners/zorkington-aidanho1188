const readline = require("readline");
const fs = require("fs");
const jsonData = fs.readFileSync("rooms.json");
const obj = JSON.parse(jsonData);
console.log(obj);
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let answer = await ask(welcomeMessage);
  await prompt(answer);
  process.exit();
}

// * current room
//   * room descriptions (immutable)
//   * room connections (immutable)
//   * room inventory (mutable)
// * current player
//   * player inventory (mutable)
//   * player status (mutable)

// * Main game functions

// * helper functions

class location {
  constructor(description, connection, inventory) {
    this.description = description;
    this.connection = connection;
    this.inventory = inventory;
  }
}

class player {
  constructor(inventory, status) {
    this.inventory = inventory;
    this.status = status;
  }
  // player actions functions
  read = (item) => {
    return item.getDescription();
  }

  pickUp = (item) => {
    this.inventory = inventory.push(item);
  }

  drop = (dropItem) => {
    for (let i = 0; i < this.inventory.length; i++) {
      if( this.inventory[i] === dropItem){
        this.inventory.slice(i, 1);
      }
    }
  }

  use = (item) => {
    if(this.inventory.hasOwnProperty(item) ){
      // use item logic
    }
  }
}

class item {
  constructor(name, description){
    this.name = name;
    this.description = description;
    this.location = location;
    getDescription = function() {
      return this.description;
    }
  }
}

//  state machine
let locationCurrent = "startRoom";

let locationLookUp = {
  // startRoom : startRoom,
  // room1: room1,
  // room2: room2,
  // room3: room3,
  // room4: room4
}

let locationStates = {
  // startRoom : [room1, room2, room3, room4],
  // room1: [startRoom],
  // room2: [startRoom],
  // room3: [startRoom]
}

function moveLocation(newLocation) {
  // using locationState, if location is valid, move! else return an error
}

// Interact With an Item
// **Given** the player has been given introductory text
// **When** the player enters a valid command, and target
// **Then** the game should output accordingly
// >_ read sign
// The sign says "Welcome to Burlington Code Academy!
// Come on up to the third floor.
// If the door is locked, use the code 12345."
// **And** puts the player in the `starting room`
// **And** returns to the prompt
function interact(command, target) {
  if (player.hasOwnProperty(command)) {
    player.command(target);
  } else {
    console.log("I don't know \"${command}\".")
  }
}


// TODO: Immovable Objects
// **Given** the player is in the `starting room`
// **When** the player attempts to take something that is not takeable
// **Then** the game denies the player
// >_take sign
// That would be selfish. How will other students find their way?
// (assume " **And** returns to the prompt" after this and all future stories)
function isTakeable(item) {
  return item.isTakeable;
}


// TODO: Locked Out
// **Given** the player is in the `starting room`
// **When** the player attempts to enter a new room
// **Then** the game denies the player
// >_open door
// The door is locked. There is a keypad on the door handle.
function isLocked(){
  // this is where we use the state machine!
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


// TODO: Foyer
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
function displayAvailableItems() {
  // display location.description;
  // display location.inventory
}

// TODO: Inventory
// **Given** the player is in the `next room`
// **And** the player has not yet picked up the item
// **When** the player enters a command to pick it up
// **Then** the game allows the player to do so
// >_take paper
// You pick up the paper and leaf through it looking for comics 
// and ignoring the articles, just like everybody else does.
// **And** the item is added to the player's `inventory`
function pickUp(item){
  // return player.inventory += player.pick(item);
}

// TODO: Display Inventory
// **Given** an item is in the player's 'inventory'
// **When** the player types `i` or `inventory` or `take inventory`
// **Then** the game displays the player's `inventory`
// You are carrying:
// A copy of the local paper
function displayInventory(){
  return console.log(player.inventory());
}

// TODO: Drop Inventory
// **Given** an item is in the player's `inventory`
// **When** the player types `drop <ITEM>`
// **Then** that item is removed from the player's `inventory`
// >_drop paper
// You drop the paper
// **And** that item is added to the current room's `inventory`
function drop(item) {
  player.drop(item);
  return console.log(`You drop the ${item.name}`);
}

// TODO: Keep Doors Open
// **Given** you have unlocked a door
// **When** you try and open the door again
// **Then** the door should still be unlocked, and allow you to pass to the next room
function unlocked(door) { // pass location into "door"
  // state machines 
  return door.locked; // door aka door location is a object with locked as the property?
}

// TODO: Create More Rooms
// Create at least 4 more rooms, with their own connections, puzzles, and/or inventories
// Each room should have:
// * A limited number of other rooms it connects to (you can't move directly between some rooms without going through others)
// * A unique description
// * A separate Inventory (the inventory can be empty)
// * Optionally you can add more puzzles, locked doors, and interactive items


// from README.md
async function prompt(answer) {
  while (answer !== "exit") {
    answer = await ask(">_ ");
  }
}
