const fs = require("fs");
const readline = require("readline");
const {Item} = require("./classes/Item");
const {Location} = require("./classes/Location");
const {Player} = require("./classes/Player");
const {Puzzle} = require("./classes/Puzzle");

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

// const room0 = new Location(...Object.values(roomsList[0]));
// const room1 = new Location(...Object.values(roomsList[1]));
// const room2 = new Location(...Object.values(roomsList[2]));
// const room3 = new Location(...Object.values(roomsList[3]));
// const room4 = new Location(...Object.values(roomsList[4]));
// const room5 = new Location(...Object.values(roomsList[5]));
// const room6 = new Location(...Object.values(roomsList[6]));

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
  amulet: amulet
};

// future feature: display item name in a more descriptive way
let itemNameLookUp = {
  sign: ["sign"],
  paper: ["piece of paper", "paper"],
  key: ["ornate key", "key"],
  amulet: ["amulet", "shadow amulet"]
};

let commandLookUp = {
  read: ["r", "read"],
  look: ["l", "look", "examine"],
  inventory: ["i", "inventory"],
  use: ["use", "u", "burn"],
  drop: ["d", "drop"],
  take: ["t", "take"],
  go: ["go", "g", "move", "open", "o", "enter"],
  endGame: ["exit"],
};

// Future feature: write a help function to display all the commands
let commandFunctionLookUp = {
  read: read,
  look: look,
  inventory: showPlayerInventory,
  use: use,
  drop: drop,
  take: take,
  go: moveRoom,
  endGame: endGame
};

let locationLookUp = {};
(function initilize(){
  for (let i = 0; i < rooms.length; i++) {
    const key = "room" + i;
    locationLookUp[key] = new Location(...Object.values(roomsList[i]));
}})();

let locationState = {
  room0: ["room1"], // outside
  room1: ["room0", "room2", "room4"], // church
  room2: ["room1", "room3"], // floor1
  room3: ["room2"], // floor2
  room4: ["room1", "room5"], // basement1
  room5: ["room4", "room6"], // basement2 
  room6: ["room5"], // finnal room
};

// Future feature: should write a function to deal with these case sensitive room's names
let roomNameLookup = {
  room0: ["street", "outside"],
  room1: ["church"],
  room2: ["floor1", "floor one", "first floor", "grand door", "door", "Grand door", "granddoor", "floor 1","Floor one"],
  room3: ["floor2", "floor two", "second floor", "floor 2", "Floor two"],
  room4: ["basement1", "basement 1", "basement one", "first basement", "Basement one"],
  room5: ["basement2", "basement 2", "basement two", "second basement", "Basement two", "passage", "hidden passage", "Hidden passage"],
  room6: ["basement3", "basement 3", "basement three", "altar", "Altar"]
};

let puzzleLocation = {
  room1: lockpad,
  room2: grandDoor,
  room5: hiddenPassage,
  room6: oldAltar,
};

start();

// * Main game logics
async function start() {
  displayRoom();
  await gameLoop(player);
  process.exit();
}

function displayRoom() {
  let room = locationLookUp[player.location];
  return console.log(`\n\n\n\nRoom name: ${room.name}   Available items: ${room.inventory}    Commands: go, i, look, read, open, burn, drop, use...`);
}

async function gameLoop(player) {
  do {
    let answer = await prompt();
    await handleUserCommand(answer);
    displayRoom();
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
    } else if (puzzle.name === "oldAltar" && item.name === "paper"){ // special case for the last puzzle
      print("You burned the magical paper");
      removeItemFromPlayer(item);
      promptForLastPuzzle(puzzle);
      return true;
    }
  }
  print(`You can't use this item here 😔`);
}

async function promptForLastPuzzle(puzzle) {
  let answer = await ask("Now you must recite the ancient incantation: ");
  if(puzzle.answer === answer){
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

async function look() {
  let room = locationLookUp[player.location];
  print(`${room.description1}`);
  await ask("Press enter to continue...");
  print(`${room.description2}`);
  await ask("Press enter to continue...");
}

function endGame() {
  return player.answer = "exit";
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
  } else if (item === null){
    return print(`You can't take nothing 🚫`);
  } else {
    return print(`You can't take this ${item} 🚫`);
  }
}

function drop(item) {
  if (itemLookUp.hasOwnProperty(item) && [...player.inventory].includes(item)) {
    removeItemFromPlayer(item);
    addItemToRoom(player.location, itemNameLookUp[item][0]);
    return print(`You dropped a ${item} 🤚`);
  } else if(![...player.inventory].includes(item)){
    return print(`You don't have this ${item} to drop 😕`);
  } else {
    return print(`You can't drop this ${itemName} 🚫`);
  }
}

// helper functions for take/drop functions
function itemIsPresent(item){
  let itemObjectName = getObjectName(item, itemNameLookUp);
  let locationItems = locationLookUp[player.location].inventory;
  return itemLookUp.hasOwnProperty(itemObjectName) &&  checkAvailableItem(itemObjectName, locationItems);
}

function checkAvailableItem(itemObjectName, availableItems) {
  for (var i = 0; i < availableItems.length; i++) {
    if(getObjectName(availableItems[i], itemNameLookUp) == itemObjectName) {
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
  let puzzle = puzzleLocation[targetedRoom]
  print(`${puzzle.message}`);
  // prompt for password / back / use items
  while (!puzzle.isSolved) {
    let input = await prompt(puzzle.promptMessage);
    if (input === puzzle.answer) {
      setPuzzleIsSolved(puzzle, targetedRoom);
      return true;
    } else if (input === "back") {
      return false;
    } else if(hasUseCommand(input)) {
      let inputArr = input.trim().split(" "); // bad code, should write this in another function
      let item = getTarget(inputArr);
      let usuable = await use(item, targetedRoom);
      if(usuable === true) {
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
  if(validateCommandKey(command)){
    return true;
  } else {
    return false;
  }
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

function validateCommandKey(command) {
  return Object.keys(commandLookUp).find((key) => commandLookUp[key].includes(command)) || false;
}

function getObjectName(item, nameLookUp) {
  return Object.keys(nameLookUp).find((key) => nameLookUp[key].includes(item));
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

function removeItemFromPlayer(item) {
  itemIndex = player.inventory.indexOf(item);
  player.inventory.splice(itemIndex, 1);
}

function print(text) {
  let wordArr = text.split(" ");
  let size = 0;
  let phrase = "";

  for (let i = 0; i < wordArr.length; i++) {
    if (size <= 80) {
      phrase += wordArr[i] + " ";
      size += wordArr[i].length + 1;
    } else {
      console.log(phrase);
      size = 0;
      phrase = "";
      i--;
    }
  }

  if (phrase.trim() !== "") {
    console.log(phrase);
  }
}