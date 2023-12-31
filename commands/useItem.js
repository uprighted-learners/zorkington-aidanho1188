const {puzzleLookup} = require("../helpers/puzzlesLookup");
const {itemLookUp} = require("../helpers/itemsLookUp");
const {ItemDoesntExist, PlayerDoesntHaveItem, ItemIsUnusable} = require("../errors/itemErrors");
const {setPuzzleIsSolved} = require("../helpers/setPuzzleIsSolved");
const {print} = require("../helpers/print");
const {movePlayer} = require("../helpers/movePlayer");
const {ask} = require("../helpers/prompt");
const {checkItemExist} = require("../helpers/checkItemExist");

async function use(player, item, targetedRoom) {
  let puzzle = puzzleLookup[targetedRoom];
  try {
    if (lastPuzzle(puzzle, item)) {
      print("You burned the magical paper");
      removeItemFromPlayer(player, item);
      return await promptForLastPuzzle(puzzle);
    } else {
      validateUse(player, item, puzzle);
      setPuzzleIsSolved(puzzle, targetedRoom);
      movePlayer(player, targetedRoom);
      return true;
    }
  } catch (error) {
    throw error;
  }
}

function validateUse(player, item, puzzle) {
  if (!checkItemExist(item)) {
    throw new ItemDoesntExist("This item doesn't exists");
  }
  if (!playerHasItem(player, item)) {
    throw new PlayerDoesntHaveItem("Player doesn't have this item");
  }
  if (!usuable(puzzle, item)) {
    throw new ItemIsUnusable("You can't use this item here");
  }
}

function playerHasItem(player, item) {
  return [...player.inventory].includes(item);
}

function usuable(puzzle, item) {
  item = itemLookUp[item];
  return item.puzzleCode === puzzle.answer;
}

function lastPuzzle(puzzle, item) {
  item = itemLookUp[item];
  return puzzle.name === "oldAltar" && item.name === "paper";
}

function removeItemFromPlayer(player, item) {
  itemIndex = player.inventory.indexOf(item);
  player.inventory.splice(itemIndex, 1);
}

async function promptForLastPuzzle(puzzle) {
  let answer = await ask("Now you must recite the ancient incantation: ");
  if (puzzle.answer === answer) {
    print(puzzle.solvedMessage);
  } else {
    print(puzzle.wrongAnswer);
  }
  return process.exit();
}
exports.use = use;
