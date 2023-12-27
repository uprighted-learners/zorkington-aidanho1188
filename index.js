const fs = require("fs");
const readline = require("readline");
const {Item} = require("./classes/Item");
const {Player} = require("./classes/Player");
const {roomNameLookup, locationState, itemNameLookUp, locationLookUp} = require("./helpers/lookUps");
const {puzzleLookup} = require("./helpers/puzzleLookup");
const {itemLookUp} = require("./helpers/itemLookUp");
const {displayRoom} = require("./helpers/displayRoom");
const {getCommand, validateCommandKey, getObjectName, getTarget} = require("./helpers/getFunctions");
const {print} = require("./helpers/print");
const {moveRoom} = require("./commands/moveRoom");
const {MoveRoomError, NotUnlockedError} = require("../zorkington-aidanho1188/errors/moveRoomErrors");

const readlineInterface = readline.createInterface(process.stdin, process.stdout);
const player = new Player();

let commandFunctionLookUp = {
  read: read,
  look: look,
  inventory: showPlayerInventory,
  use: use,
  drop: drop,
  take: take,
  go: tryMoveRoom,
  endGame: endGame,
};
start();

// * Main game logics
async function start() {
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
// maybe move this to handleUserCommand
async function tryMoveRoom(targetedRoom) {
  targetedRoom = getObjectName(targetedRoom, roomNameLookup);
  try {
    moveRoom(player, targetedRoom);
  } catch (error) {
    if (error instanceof NotUnlockedError) {
      console.log(error.message);
      await displayRoomPuzzle(targetedRoom);
    } else {
      console.log(error.message);
    }
  }
}

async function use(item, targetedRoom) {
  let puzzle = puzzleLookup[targetedRoom];
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
  let puzzle = puzzleLookup[targetedRoom];
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
