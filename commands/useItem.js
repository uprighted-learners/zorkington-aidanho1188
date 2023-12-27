const {locationState, locationLookUp} = require("../helpers/lookUps");

async function use(player, item, targetedRoom) {
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
  try {
    validateUse(player, item);
    setPuzzleIsSolved(puzzle, targetedRoom);
    return true;
  } catch (error) {
    throw error;
  }
  // print(`You can't use this item here 😔`);
}

function validateUse(player, item) {
  if (!checkItemExist(item)) {
    throw new Error(`This item doesn't exists`);
  }
  if (!playerHasItem(player, item)) {
    throw new Error(`Player doesn't have this item`);
  }
}

function checkItemExist(item) {
  return itemLookUp.hasOwnProperty(item);
}

function playerHasItem(player, item) {
  return [...player.inventory].includes(item);
}
exports.use = use;
