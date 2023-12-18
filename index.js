const fs = require("fs");
const readline = require("readline");
const {Item} = require("./Item");
const {Location} = require("./Location");
const {Player} = require("./Player");
const {Puzzle} = require("./Puzzle");
const { resolve } = require("path");
const roomsJsonData = fs.readFileSync("./data/roomsList.json");
const itemsJsonData = fs.readFileSync("./data/itemsList.json");
const puzzleJsonData = fs.readFileSync("./data/puzzleList.json");
const items = JSON.parse(itemsJsonData);
const rooms = JSON.parse(roomsJsonData);
const puzzles = JSON.parse(puzzleJsonData);
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// hmm its so dry here 
// TODO: fix this and put all classes into a folder
const startRoom = new Location(rooms[0].name, rooms[0].description, rooms[0].inventory, true);
const room1 = new Location(rooms[1].name, rooms[1].description, rooms[1].inventory, false);
const room2 = new Location(rooms[2].name, rooms[2].description, rooms[2].inventory, false);
const room3 = new Location(rooms[3].name, rooms[3].description, rooms[3].inventory, false);
const room4 = new Location(rooms[4].name, rooms[4].description, rooms[4].inventory, false);
const room5 = new Location(rooms[5].name, rooms[5].description, rooms[5].inventory, false);

const sign = new Item(items[0].name, items[0].description, items[0].location, items[0].isTakeable);
const paper = new Item(items[1].name, items[1].description, items[1].location, items[1].isTakeable);

const lockpad = new Puzzle(puzzles[0].name, puzzles[0].location, puzzles[0].puzzleMessage, puzzles[0].puzzleSolved, puzzles[0].puzzleAnswer, puzzles[0].puzzleWrongAnswer, puzzles[0].puzzleIsSolved);
const player = new Player();

let itemLookUp = {
  sign: sign,
  paper: paper,
};

let commandLookUp = {
  read: ["r", "read"],
  inventory: ["i", "inventory"],
  use: ["use", "u"],
  drop: ["d", "drop"],
  take: ["t", "take"],
  go: ["go", "g", "move", "open", "o", "enter"],
  endGame: ["exit"],
};


let commandFunctionLookUp = {
  read: read,
  inventory: showPlayerInventory,
  use: use,
  drop: drop,
  take: take,
  go: moveRoom,
  endGame: endGame
};

let locationLookUp = {
  startRoom: startRoom,
  room1: room1,
  room2: room2,
  room3: room3,
  room4: room4,
};

let locationState = {
  startRoom: ["room1"],
  room1: ["startRoom", "room2"],
  room2: ["room1", "room3"],
  room3: ["room2", "room4"],
  room4: ["room3"],
};

let roomNameLookup = {
  startRoom: ["street", "outside"],
  room1: ["church"],
  room2: ["floor1", "floor one", "first floor"],
  room3: ["floor2", "floor two", "second floor"],
  room4: ["basement1", "basement one", "first basement"],
  room5: ["floor3", "basement two", "second basement"],
};

let puzzleLocation = {
  room1: lockpad,
};

start();

async function start() {
  const welcomeMessage = locationLookUp[player.location].description;
  console.log(welcomeMessage);
  await gameLoop(player);
  process.exit();
}

async function gameLoop(player, answer = "") {
  do {
    let answer = await prompt();
    await interact(answer);
    console.log(`\n\n\n${displayRoom(locationLookUp[player.location])}`);
  } while (answer !== "exit");
}

async function prompt(question = "") {
  return ask(`${question}>_ `);
}

function getCommand(input) {
  return input[0].toLowerCase();
}

function getTarget(input) {
  if (input.length > 1) {
    return input.splice(1).join(" ");
  } else {
    return null;
  }
}

async function interact(answer) {
  let answerArr = answer.trim().split(" ");
  let command = getCommand(answerArr);
  let target = getTarget(answerArr);
  console.log(target);
  let commandKey = Object.keys(commandLookUp).find((key) => commandLookUp[key].includes(command)); 
  let commandFunction = commandFunctionLookUp[commandKey];
  // TODO: test for exit church command
  try {
    await commandFunction(target);
  } catch (error) {
    console.log(`I don't know this "${command}" command. 😕`);
    // console.log(error);
  }
}

function endGame() {
  return "exit";
}

async function moveRoom(targetedRoom) {
  let currentRoom = player._location;
  targetedRoom = getRoomObjectName(targetedRoom);
  console.log(targetedRoom)
  try {
    let isUnLocked = locationLookUp[targetedRoom]._isUnlocked;
    if (locationState[currentRoom].includes(targetedRoom) && isUnLocked) {
      player._location = targetedRoom;
    } else if (isUnLocked === false) {
      console.log("\n\n\nPlease solve this puzzle");
      await displayRoomPuzzle(targetedRoom);
    }
  } catch (error) {
    console.log("You can't move to this room!", error);
  }
}

async function displayRoomPuzzle(targetedRoom) {
  let puzzle = puzzleLocation[targetedRoom]
  console.log(`${puzzle._puzzleMessage}`);
  // prompt for password
  while (true) {
    let answer = await prompt("What is the passcode? ");
    if (answer === puzzle._puzzleAnswer) {
      setPuzzleIsSolved(puzzle, targetedRoom);
      return true;
    } else if (answer === "back") {
      return false;
    } else {
      console.log(puzzle._puzzleWrongAnswer);
    }
  }
}

function getRoomObjectName(targetedRoom) {
  return Object.keys(roomNameLookup).find((key) => roomNameLookup[key].includes(targetedRoom));
}

function read(item) {
  if (itemLookUp.hasOwnProperty(item)) {
    item = itemLookUp[item];
    return console.log(item._description);
  } else {
    return console.log(`You can't read this ${item} 😔`);
  }
}

function setPuzzleIsSolved(puzzle, targetedRoom) {
  locationLookUp[targetedRoom]._isUnlocked = true;
  puzzle._puzzleIsSolved = true;
  console.log(`${puzzle._puzzleSolvedMessage}`);
}

function use(item, target) {
  if (itemLookUp.hasOwnProperty(item)) {
    // item will unlock puzzle
    if (item === puzzle._puzzleAnswer) {
      setPuzzleIsSolved(puzzle, targetedRoom)
    }
  } else {
    console.log(`You can't use this ${item} here 😔`);
  }
  return;
}

// too dry here
function drop(item) {
  if (itemLookUp.hasOwnProperty(item)) {
    itemIndex = player._inventory.indexOf(item);
    player._inventory.splice(itemIndex, 1);
    addItemToRoom(player._location, item);
    return console.log(`You dropped ${item} 🤚`);
  } else {
    return console.log(`You can't drop this ${item}`);
  }
}

function take(item) {
  if (itemLookUp.hasOwnProperty(item) && itemLookUp[item]._isTakeable) {
    player._inventory.push(item);
    removeItemFromRoom(player._location, item);
    return console.log(`You take ${item} 🤚`);
  } else if (item === null){
    return console.log(`You can't take nothing 🚫`);
  } else {
    return console.log(`You can't take this ${item} 🚫`);
  }
}

function removeItemFromRoom(currentLocation, removeItem) {
  let location = locationLookUp[currentLocation];
  let itemIndex = location._inventory.indexOf(removeItem);
  location._inventory.splice(itemIndex, 1);
}

function addItemToRoom(currentLocation, addedItem) {
  let location = locationLookUp[currentLocation];
  location._inventory.push(addedItem);
}

function showPlayerInventory() {
  if (player._inventory.length) {
    console.log([...player._inventory].map((item) => item));
  } else {
    console.log(`Your inventory is empty 😔`);
  }
}

function displayRoom(room) {
  return `Room name: ${room.name}   Available items: ${room.inventory}\nDescription: "${locationLookUp[player._location].description}"`;
}

// TODO: Create More Rooms
// Create at least 4 more rooms, with their own connections, puzzles, and/or inventories
// Each room should have:
// * A limited number of other rooms it connects to (you can't move directly between some rooms without going through others)
// * A unique description
// * A separate Inventory (the inventory can be empty)
// * Optionally you can add more puzzles, locked doors, and interactive items
