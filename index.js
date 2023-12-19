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
const startRoom = new Location(rooms[0].name, rooms[0].description1, rooms[0].description2, rooms[0].inventory, true);
const room1 = new Location(rooms[1].name, rooms[1].description1, rooms[1].description2, rooms[1].inventory);
const room2 = new Location(rooms[2].name, rooms[2].description1, rooms[2].description2, rooms[2].inventory);
const room3 = new Location(rooms[3].name, rooms[3].description1, rooms[3].description2, rooms[3].inventory);
const room4 = new Location(rooms[4].name, rooms[4].description1, rooms[4].description2, rooms[4].inventory, true);
const room5 = new Location(rooms[5].name, rooms[5].description1, rooms[5].description2, rooms[5].inventory);

const sign = new Item(items[0].name, items[0].description, items[0].location, items[0].isTakeable);
const paper = new Item(items[1].name, items[1].description, items[1].location, items[1].isTakeable);
const key = new Item(items[2].name, items[2].description, items[2].location, items[2].isTakeable, items[2].puzzleCode);
const amulet = new Item(items[3].name, items[3].description, items[3].location, items[3].isTakeable, items[3].puzzleCode);

const lockpad = new Puzzle(puzzles[0].name, puzzles[0].location, puzzles[0].message, puzzles[0].promptMessage, puzzles[0].solved, puzzles[0].answer, puzzles[0].wrongAnswer, puzzles[0].isSolved);
const grandDoor = new Puzzle(puzzles[1].name, puzzles[1].location, puzzles[1].message, puzzles[1].promptMessage, puzzles[1].solved, puzzles[1].answer, puzzles[1].wrongAnswer, puzzles[1].isSolved);
const hiddenPassage = new Puzzle(puzzles[2].name, puzzles[2].location, puzzles[2].message, puzzles[2].promptMessage, puzzles[2].solved, puzzles[2].answer, puzzles[2].wrongAnswer, puzzles[2].isSolved)

const player = new Player();

let itemLookUp = {
  sign: sign,
  paper: paper,
  key: key,
  amulet: amulet
};

// future features: display item name in a more descriptive way
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
  use: ["use", "u"],
  drop: ["d", "drop"],
  take: ["t", "take"],
  go: ["go", "g", "move", "open", "o", "enter"],
  endGame: ["exit"],
};

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

let locationLookUp = {
  startRoom: startRoom,
  room1: room1,
  room2: room2,
  room3: room3,
  room4: room4,
  room5: room5,
};

let locationState = {
  startRoom: ["room1"], // outside
  room1: ["startRoom", "room2", "room4"], // church
  room2: ["room1", "room3"], // floor1
  room3: ["room2"], // floor2
  room4: ["room1", "room5"], // basement1
  room5: ["room4"], // basement2
};

// Future feature: should write a function to deal with these cases sensitive room names
let roomNameLookup = {
  startRoom: ["street", "outside"],
  room1: ["church"],
  room2: ["floor1", "floor one", "first floor", "grand door", "door", "Grand door", "granddoor", "floor 1","Floor one"],
  room3: ["floor2", "floor two", "second floor", "floor 2", "Floor two"],
  room4: ["basement1", "basement 1", "basement one", "first basement", "Basement one"],
  room5: ["basement2", "basement 2", "basement two", "second basement", "Basement two", "passage", "hidden passage", "Hidden passage"],
};

let puzzleLocation = {
  room1: lockpad,
  room2: grandDoor,
  room5: hiddenPassage,
};

start();

async function start() {
  displayRoom();
  await gameLoop(player);
  process.exit();
}

async function gameLoop(player) {
  do {
    let answer = await prompt();
    await interact(answer);
    displayRoom();
  } while (player.answer !== "exit");
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
  let commandKey = validateCommandKey(command); 
  let commandFunction = commandFunctionLookUp[commandKey];
  try {
    await commandFunction(target);
  } catch (error) {
    console.log(`I don't know this "${command}" command. 😕`);
  }
}

function validateCommandKey(command) {
  return Object.keys(commandLookUp).find((key) => commandLookUp[key].includes(command)) || false;
}

function endGame() {
  return player.answer = "exit";
}

async function moveRoom(targetedRoom) {
  let currentRoom = player.location;
  targetedRoom = getRoomObjectName(targetedRoom);
  try {
    let isUnLocked = locationLookUp[targetedRoom].isUnlocked;
    if (locationState[currentRoom].includes(targetedRoom) && isUnLocked) {
      player.location = targetedRoom;
    } else if (locationState[currentRoom].includes(targetedRoom) && isUnLocked === false) {
      console.log("\n\n\nPlease solve this puzzle first!");
      await displayRoomPuzzle(targetedRoom);
    } else {
      console.log("You can't move to this room!");
    }
  } catch (error) {
    console.log(`This ${targetedRoom} room does not exist!`);
  }
}

async function displayRoomPuzzle(targetedRoom) {
  let puzzle = puzzleLocation[targetedRoom]
  console.log(`${puzzle.message}`);
  // prompt for password / back / use items
  while (true) {
    let input = await prompt(puzzle.promptMessage);
    if (input === puzzle.answer) {
      setPuzzleIsSolved(puzzle, targetedRoom);
      player.location = targetedRoom;
      return true;
    } else if (input === "back") {
      return false;
    } else if(hasUseCommand(input)) {
      let inputArr = input.trim().split(" ");
      let item = getTarget(inputArr);
      if(use(item, targetedRoom) ==  true){
        return true;
      }
    } else {
      console.log(puzzle.wrongAnswer);
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

function getRoomObjectName(targetedRoom) {
  return Object.keys(roomNameLookup).find((key) => roomNameLookup[key].includes(targetedRoom));
}

function getItemObjectName(item) {
  return Object.keys(itemNameLookUp).find((key) => itemNameLookUp[key].includes(item));

}

function read(item) {
  if (itemIsPresent(item)) {
    item = itemLookUp[item];
    return console.log(item.description);
  } else {
    return console.log(`You can't read this ${item} 😔`);
  }
}

async function look() {
  let room = locationLookUp[player.location];
  console.log(`${room.description1}`);
  await ask("Press enter to continue...");
  console.log(`${room.description2}`);
  await ask("Press enter to continue...");
}

function setPuzzleIsSolved(puzzle, targetedRoom) {
  locationLookUp[targetedRoom].isUnlocked = true;
  puzzle.isSolved = true;
  console.log(`${puzzle.solvedMessage}`);
}

function use(item, targetedRoom) {
  let puzzle = puzzleLocation[targetedRoom];
  if (itemLookUp.hasOwnProperty(item) && [...player.inventory].includes(item)) {
    item = itemLookUp[item];
    if (item.puzzleCode === puzzle.answer) {
      setPuzzleIsSolved(puzzle, targetedRoom);
      player.location = targetedRoom;
      return true;
    }
  } else {
    console.log(`You can't use this ${item} here 😔`);
  }
}

function drop(item) {
  if (itemLookUp.hasOwnProperty(item) && [...player.inventory].includes(item)) {
    itemIndex = player.inventory.indexOf(item);
    player.inventory.splice(itemIndex, 1);
    addItemToRoom(player.location, itemNameLookUp[item][0]);
    return console.log(`You dropped a ${item} 🤚`);
  } else if(![...player.inventory].includes(item)){
    return console.log(`You don't have this ${item} to drop 😕`);
  } else {
    return console.log(`You can't drop this ${itemName} 🚫`);
  }
}

function take(item) {
  let itemObjectName = getItemObjectName(item);
  if (itemIsPresent(item) && itemLookUp[itemObjectName].isTakeable) {
    player.inventory.push(itemObjectName);
    removeItemFromRoom(player.location, itemObjectName);
    return console.log(`You take a ${item} 🤚`);
  } else if (item === null){
    return console.log(`You can't take nothing 🚫`);
  } else {
    return console.log(`You can't take this ${item} 🚫`);
  }
}

function itemIsPresent(item){
  let itemObjectName = getItemObjectName(item);
  let locationItems = locationLookUp[player.location].inventory;
  return itemLookUp.hasOwnProperty(itemObjectName) &&  checkAvailableItem(itemObjectName, locationItems);
}

function checkAvailableItem(itemObjectName, availableItems) {
  for (var i = 0; i < availableItems.length; i++) {
    if(getItemObjectName(availableItems[i]) == itemObjectName) {
      return true;
    }
  }
  return false;
}

function removeItemFromRoom(currentLocation, removeItem) {
  removeItem = getItemObjectName(removeItem);
  let location = locationLookUp[currentLocation];
  let itemIndex = location.inventory.indexOf(removeItem);
  location.inventory.splice(itemIndex, 1);
}

function addItemToRoom(currentLocation, addedItem) {
  let location = locationLookUp[currentLocation];
  location.inventory.push(addedItem);
}

function showPlayerInventory() {
  if (player.inventory.length) {
    console.log([...player.inventory].map((item) => item));
  } else {
    console.log(`Your inventory is empty 😔`);
  }
}

function displayRoom() {
  let room = locationLookUp[player.location];
  return console.log(`\n\n\n\n\n\n\n\nRoom name: ${room.name}   Available items: ${room.inventory}`);
}
