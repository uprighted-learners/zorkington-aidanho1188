const fs = require("fs");
const readline = require("readline");
const {Item} = require("./Item");
const {Location} = require("./Location");
const {Player} = require("./Player");
const roomsJsonData = fs.readFileSync("./data/roomsList.json");
const itemsJsonData = fs.readFileSync("./data/itemsList.json");
const items = JSON.parse(itemsJsonData);
const rooms = JSON.parse(roomsJsonData);
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// hmm its so dry here 
const startRoom = new Location(rooms[0].name, rooms[0].description, rooms[0].inventory);
const room1 = new Location(rooms[1].name, rooms[1].description, rooms[1].inventory);
const room2 = new Location(rooms[2].name, rooms[2].description, rooms[2].inventory);
const room3 = new Location(rooms[3].name, rooms[3].description, rooms[3].inventory);
const room4 = new Location(rooms[4].name, rooms[4].description, rooms[4].inventory);

const sign = new Item(items[0].name, items[0].description, items[0].location, items[0].isTakeable);
const paper = new Item(items[1].name, items[1].description, items[1].location, items[1].isTakeable);

let itemLookUp = {
  sign: sign,
  paper: paper
}

let commandLookUp = {
  read: ["r", "read"],
  getInventory: ["i","inventory"],
  use: ["r", "use"],
  drop: ["d", "drop"],
  take: ["t", "take"],
  go: ["go", "g", "move", "open", "o"]
}

let locationLookUp = {
  startRoom: startRoom,
  room1: room1,
  room2: room2,
  room3: room3,
  room4: room4
}

let locationState = {
  startRoom: ["room1"],
  room1: ["startRoom", "room2"],
  room2: ["room1", "room3"],
  room3: ["room2", "room4"],
  room4: ["room3"]
}

start();

async function start() {
  const player = new Player();
  const welcomeMessage = locationLookUp[player.getLocation()].description;
  console.log(welcomeMessage);
  await gameLoop(player);
  process.exit();
}

async function gameLoop(player, answer = "") {
  do {
    displayRoom(locationLookUp[player.getLocation()]);
    // changeRoom(player, room2);
    answer = await ask(">_ ");
    let input = answer.trim().split(" ");
    let command = input[0].toLowerCase();
    let item = input[1];
    let value = Object.values(commandLookUp).find(value => value.includes(command));
    let key = Object.keys(commandLookUp).find(key => commandLookUp[key] === value);
    // console.log(key,value); // for debugging

    if(value.includes(command)){
      command = key;
      if (itemLookUp.hasOwnProperty(item)) {
        item = itemLookUp[item];
      }

      interact(player, command, item);
    }
  } while (answer !== "exit");
}

function interact(player, command, target) {
  if (player.hasOwnProperty(command)) {
    player[command](target);
  } else if(command === "go") {
    // TODO: should structure this better
    changeRoom(player, target);
  } else{
    console.log(`I don't know "${command}" command.`);
  }
}

function changeRoom(player, targetedRoom){
  let currentRoom = player.getLocation();
  if(locationState[currentRoom].includes(targetedRoom)){
    player.setLocation(targetedRoom);
  } else {
    console.log("I can't move to this room!");
  }
}

// TODO: Locked Out
// **Given** the player is in the `starting room`
// **When** the player attempts to enter a new room
// **Then** the game denies the player
// >_open door
// The door is locked. There is a keypad on the door handle.
function isLocked(room) {
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
function checkPassword(password) {
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
  console.log(`Room name: ${room.name}              Available items: ${room.inventory}`);
}

// TODO: Display Inventory
// **Given** an item is in the player's 'inventory'
// **When** the player types `i` or `inventory` or `take inventory`
// **Then** the game displays the player's `inventory`
// You are carrying:
// A copy of the local paper
function displayInventory(player) {
  return console.log(player.inventory);
}

// TODO: Keep Doors Open
// **Given** you have unlocked a door
// **When** you try and open the door again
// **Then** the door should still be unlocked, and allow you to pass to the next room
function unlocked(door) {
  // pass location into "door"
  // state machines
  door.isUnlocked === false;
  return;
}

// TODO: Create More Rooms
// Create at least 4 more rooms, with their own connections, puzzles, and/or inventories
// Each room should have:
// * A limited number of other rooms it connects to (you can't move directly between some rooms without going through others)
// * A unique description
// * A separate Inventory (the inventory can be empty)
// * Optionally you can add more puzzles, locked doors, and interactive items
