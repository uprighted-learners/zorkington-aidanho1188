const fs = require("fs");
const readline = require("readline");
const {Item} = require("./classes/Item");
const {Location} = require("./classes/Location");
const {Player} = require("./classes/Player");
const {Puzzle} = require("./classes/Puzzle");
const {roomNameLookup, locationState, itemNameLookUp} = require("./helpers/lookUps");
const {displayRoom} = require("./helpers/displayRoom");
const {getCommand, validateCommandKey, getObjectName, getTarget} = require("./helpers/getFunctions");
const {print} = require("./helpers/print");

const roomsJsonData = fs.readFileSync("./data/roomsList.json");
const itemsJsonData = fs.readFileSync("./data/itemsList.json");
const puzzleJsonData = fs.readFileSync("./data/puzzleList.json");

const items = JSON.parse(itemsJsonData);
const rooms = JSON.parse(roomsJsonData);
const puzzles = JSON.parse(puzzleJsonData);
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

let roomsList = {...rooms};
let itemsList = {...items};
let puzzlesList = {...puzzles};

const sign = new Item(...Object.values(itemsList[0]));
const paper = new Item(...Object.values(itemsList[1]));
const key = new Item(...Object.values(itemsList[2]));
const amulet = new Item(...Object.values(itemsList[3]));

const lockpad = new Puzzle(...Object.values(puzzlesList[0]));
const grandDoor = new Puzzle(...Object.values(puzzlesList[1]));
const hiddenPassage = new Puzzle(...Object.values(puzzlesList[2]));
const oldAltar = new Puzzle(...Object.values(puzzlesList[3]));

const player = new Player();

let itemLookUp = {
  sign: sign,
  paper: paper,
  key: key,
  amulet: amulet,
};

let commandFunctionLookUp = {
  read: read,
  look: look,
  inventory: showPlayerInventory,
  use: use,
  drop: drop,
  take: take,
  go: moveRoom,
  endGame: endGame,
};

let locationLookUp = {};

let puzzleLocation = {
  room1: lockpad,
  room2: grandDoor,
  room5: hiddenPassage,
  room6: oldAltar,
};

function initialize() {
  for (let i = 0; i < rooms.length; i++) {
    const key = "room" + i;
    locationLookUp[key] = new Location(...Object.values(roomsList[i]));
  }
}

start();

// * Main game logics
async function start() {
  initialize();
  displayRoom(getCurrentLocation(player));
  await gameLoop(player);
  process.exit();
}

async function gameLoop(player) {
  do {
    let answer = await prompt();
    await handleUserCommand(answer);
    displayRoom(getCurrentLocation(player));
  } while (player.answer !== "exit");
}

async function prompt(question = "") {
  return ask(`${question}>_ `);
}

async function handleUserCommand(answer) {
  let answerArr = answer.trim().split(" ");
  let command = getCommand(answerArr);
  let target = getTarget(answerArr);
  let commandKey = validateCommandKey(command);
  let commandFunction = commandFunctionLookUp[commandKey];
  try {
    await commandFunction(target);
  } catch (error) {
    print(`I don't know this "${command}" command. 😕`);
  }
}

// * User in game commands functions
async function moveRoom(targetedRoom) {
  let currentRoom = player.location;
  targetedRoom = getObjectName(targetedRoom, roomNameLookup);
  try {
    let isUnLocked = locationLookUp[targetedRoom].isUnlocked;
    if (locationState[currentRoom].includes(targetedRoom) && isUnLocked) {
      player.location = targetedRoom;
    } else if (locationState[currentRoom].includes(targetedRoom) && isUnLocked === false) {
      print("\n\n\nPlease solve this puzzle first!");
      await displayRoomPuzzle(targetedRoom);
    } else {
      print("You can't move to this room! 🚫");
    }
  } catch (error) {
    print(`This room does not exist! 🚫`);
  }
}

async function use(item, targetedRoom) {
  let puzzle = puzzleLocation[targetedRoom];
  if (itemLookUp.hasOwnProperty(item) && [...player.inventory].includes(item)) {
    item = itemLookUp[item];
    if (item.puzzleCode === puzzle.answer) {
      setPuzzleIsSolved(puzzle, targetedRoom);
      return true;
    } else if (puzzle.name === "oldAltar" && item.name === "paper") {
      // special case for the last puzzle
      print("You burned the magical paper");
      removeItemFromPlayer(player, item);
      promptForLastPuzzle(puzzle);
      return true;
    }
  }
  print(`You can't use this item here 😔`);
}

async function promptForLastPuzzle(puzzle) {
  let answer = await ask("Now you must recite the ancient incantation: ");
  if (puzzle.answer === answer) {
    print(puzzle.solvedMessage);
  } else {
    print(puzzle.wrongAnswer);
  }
  process.exit();
}

function read(item) {
  if (itemIsPresent(item)) {
    item = itemLookUp[item];
    return print(item.description);
  } else {
    return print(`You can't read this ${item} 😔`);
  }
}

async function look(args) {
  if (args != null) {
    console.log(`I can't look at this "${args}"`);
    return;
  }
  let room = locationLookUp[player.location];
  print(`${room.description1}`);
  await ask("Press enter to continue...");
  print(`${room.description2}`);
  await ask("Press enter to continue...");
}

function endGame() {
  return (player.answer = "exit");
}

function showPlayerInventory() {
  if (player.inventory.length) {
    console.log(`Your inventory: ${[...player.inventory].map((item) => item)}`);
  } else {
    print(`Your inventory is empty 😔`);
  }
}

// ? take/drop functions
function take(item) {
  let itemObjectName = getObjectName(item, itemNameLookUp);
  if (itemIsPresent(item) && itemLookUp[itemObjectName].isTakeable) {
    player.inventory.push(itemObjectName);
    removeItemFromRoom(player.location, itemObjectName);
    return print(`You take a ${item} 🤚`);
  } else if (item === null) {
    return print(`You can't take nothing 🚫`);
  } else {
    return print(`You can't take this ${item} 🚫`);
  }
}

function drop(item) {
  if (itemLookUp.hasOwnProperty(item) && [...player.inventory].includes(item)) {
    removeItemFromPlayer(player, item);
    addItemToRoom(player.location, itemNameLookUp[item][0]);
    return print(`You dropped a ${item} 🤚`);
  } else if (![...player.inventory].includes(item)) {
    return print(`You don't have this ${item} to drop 😕`);
  } else {
    return print(`You can't drop this ${itemName} 🚫`);
  }
}

// helper functions for take/drop functions
function itemIsPresent(item) {
  let itemObjectName = getObjectName(item, itemNameLookUp);
  let locationItems = locationLookUp[player.location].inventory;
  return itemLookUp.hasOwnProperty(itemObjectName) && checkAvailableItem(itemObjectName, locationItems);
}

function checkAvailableItem(itemObjectName, availableItems) {
  for (var i = 0; i < availableItems.length; i++) {
    if (getObjectName(availableItems[i], itemNameLookUp) == itemObjectName) {
      return true;
    }
  }
  return false;
}

function removeItemFromRoom(currentLocation, removeItem) {
  removeItem = getObjectName(removeItem, itemNameLookUp);
  let location = locationLookUp[currentLocation];
  let itemIndex = location.inventory.indexOf(removeItem);
  location.inventory.splice(itemIndex, 1);
}

function addItemToRoom(currentLocation, addedItem) {
  let location = locationLookUp[currentLocation];
  location.inventory.push(addedItem);
}

// * Puzzle functions
async function displayRoomPuzzle(targetedRoom) {
  let puzzle = puzzleLocation[targetedRoom];
  print(`${puzzle.message}`);
  // prompt for password / back / use items
  while (!puzzle.isSolved) {
    let input = await prompt(puzzle.promptMessage);
    if (input === puzzle.answer) {
      setPuzzleIsSolved(puzzle, targetedRoom);
      return true;
    } else if (input === "back") {
      return false;
    } else if (hasUseCommand(input)) {
      let inputArr = input.trim().split(" "); // bad code, should write this in another function
      let item = getTarget(inputArr);
      let usuable = await use(item, targetedRoom);
      if (usuable === true) {
        return true;
      }
    } else {
      print(puzzle.wrongAnswer);
    }
  }
}

function hasUseCommand(input) {
  let inputArr = input.trim().split(" ");
  let command = getCommand(inputArr);
  return validateCommandKey(command);
}

function setPuzzleIsSolved(puzzle, targetedRoom) {
  locationLookUp[targetedRoom].isUnlocked = true;
  player.location = targetedRoom;
  puzzle.isSolved = true;
  print(`${puzzle.solvedMessage}`);
}

// * Helper functions
function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

function removeItemFromPlayer(player, item) {
  itemIndex = player.inventory.indexOf(item);
  player.inventory.splice(itemIndex, 1);
}

function getCurrentLocation(player) {
  return locationLookUp[player.location];
}
