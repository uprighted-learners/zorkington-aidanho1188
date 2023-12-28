const fs = require("fs");
const {Item} = require("./classes/Item");
const {Player} = require("./classes/Player");
const {roomNameLookup, locationState, itemNameLookUp, locationLookUp} = require("./helpers/lookUps");
const {puzzleLookup} = require("./helpers/puzzlesLookup");
const {itemLookUp} = require("./helpers/itemsLookUp");
const {displayRoom} = require("./helpers/displayRoom");
const {getCommand, validateCommandKey, getObjectName, getTarget, getCurrentLocation} = require("./helpers/getFunctions");
const {print} = require("./helpers/print");
const {moveRoom} = require("./commands/moveRoom");
const {MoveRoomError, NotUnlockedError} = require("../zorkington-aidanho1188/errors/moveRoomErrors");
const {setPuzzleIsSolved} = require("./helpers/setPuzzleIsSolved");
const {use} = require("./commands/useItem");
const {movePlayer} = require("./helpers/movePlayer");
const {ask, prompt} = require("./helpers/prompt");
const {itemIsPresent} = require("./helpers/itemIsPresent");
const {read} = require("./commands/readItem");

const player = new Player();

const commandFunctionLookUp = {
  read: attemptRead,
  look: look,
  inventory: showPlayerInventory,
  use: attemptUse,
  drop: drop,
  take: take,
  go: attemptMoveRoom,
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

async function handleUserCommand(answer) {
  let answerArr = answer.trim().split(" ");
  let command = getCommand(answerArr);
  let target = getTarget(answerArr);
  let commandKey = validateCommandKey(command);
  let commandFunction = commandFunctionLookUp[commandKey];
  try {
    await commandFunction(target);
  } catch (error) {
    // maybe add a list of errors here
    // print(`I don't know this "${error}" command. 😕`);
    console.error(error);
  }
}

// ? User in game commands functions
// maybe move this to handleUserCommand

// * ready to transfer to handleUserCommands
async function attemptMoveRoom(targetedRoom) {
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

// * ready to transfer to handleUserCommands
async function attemptUse(item, targetedRoom) {
  try {
    use(player, item, targetedRoom);
  } catch (error) {
    console.log(error.message);
  }
}
// * ready to transfer to handleUserCommands
function attemptRead(item) {
  try {
    read(player, item);
  } catch (error) {
    console.log(error.message);
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
  if (itemIsPresent(player, item) && itemLookUp[itemObjectName].isTakeable) {
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
  // need reword, at puzzle state ex.: when say read key, it still unlock ther door
  let puzzle = puzzleLookup[targetedRoom];
  print(`${puzzle.message}`);
  // prompt for password / back / use items
  while (!puzzle.isSolved) {
    let input = await prompt(puzzle.promptMessage);
    if (input === puzzle.answer) {
      setPuzzleIsSolved(puzzle, targetedRoom);
      movePlayer(player, targetedRoom);
      return true;
    } else if (input === "back") {
      return false;
    } else if (hasUseCommand(input)) {
      let inputArr = input.trim().split(" "); // bad code, should write this in another function
      let item = getTarget(inputArr);
      let usuable = await use(player, item, targetedRoom);
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
