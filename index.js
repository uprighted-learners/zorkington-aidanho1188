const fs = require("fs");
const {Item} = require("./classes/Item");
const {Player} = require("./classes/Player");
const {roomNameLookup, locationState,} = require("./helpers/lookUps");
const {puzzleLookup} = require("./helpers/puzzlesLookup");
const {displayRoom} = require("./helpers/displayRoom");
const {getCommand, validateCommandKey, getObjectName, getTarget, getCurrentLocation} = require("./helpers/getFunctions");
const {print} = require("./helpers/print");
const {moveRoom} = require("./commands/moveRoom");
const {MoveRoomError, NotUnlockedError} = require("./errors/roomErrors");
const {setPuzzleIsSolved} = require("./helpers/setPuzzleIsSolved");
const {use} = require("./commands/useItem");
const {movePlayer} = require("./helpers/movePlayer");
const {ask, prompt} = require("./helpers/prompt");
const {read} = require("./commands/readItem");
const {look} = require("./commands/look");
const {endGame} = require("./commands/endGame");
const {showPlayerInventory} = require("./commands/showPlayerInventory");
const {take} = require("./commands/takeItem");
const {, removeItemFromRoom} = require("./helpers/roomItems");
const { drop } = require("./commands/dropItem");

const player = new Player();
exports.player = player;
// exports.player = player;

const commandFunctionLookUp = {
  read: attemptRead,
  look: attemptLook,
  inventory: attemptOpenInventory,
  use: attemptUse,
  drop: drop,
  take: attemptTake,
  go: attemptMoveRoom,
  endGame: attemptEndGame,
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

// * ready to transfer to handleUserCommands
async function attemptLook(args) {
  try {
    await look(player, args);
  } catch (error) {
    console.log(error.message);
  }
}

// * ready to transfer to handleUserCommands
function attemptEndGame(args) {
  try {
    endGame(player, args); // future feature, should ask if user want to exist game or room, use stacks?
  } catch (error) {
    console.log(error.message);
  }
}

// * ready to transfer to handleUserCommands
function attemptOpenInventory() {
  try {
    showPlayerInventory(player);
  } catch (error) {
    console.log(error.message);
  }
}

function attemptTake(item) {
  try {
    take(player, item);
  } catch (error) {
    console.log(error.message);
  }
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
