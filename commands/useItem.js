const {puzzleLookup} = require('../helpers/puzzlesLookup')
const {itemLookUp} = require('../helpers/itemsLookUp')
const {ItemDoesntExist, PlayerDoesntHaveItem, ItemIsUnusable, NoItemSelected} = require('../errors/itemErrors')
const {setPuzzleIsSolved} = require('../helpers/setPuzzleIsSolved')
const {print} = require('../helpers/print')
const {movePlayer} = require('../helpers/movePlayer')
const {ask} = require('../helpers/prompt')
const {validateItem} = require('../helpers/validateItem')
const { removeItemFromPlayer } = require('../helpers/removeItemFromPlayer')
const {getObjectName} = require('../helpers/getFunctions')

async function use(player, item, targetedRoom) {
  let puzzle = puzzleLookup[targetedRoom]
  item = getObjectName(item, itemLookUp)
  try {
    if (verifyLastPuzzle(puzzle, item)) {
      print('You burned the magical paper')
      removeItemFromPlayer(player, item)
      return await promptForLastPuzzle(puzzle)
    }
    validateUse(player, item, puzzle)
    setPuzzleIsSolved(puzzle, targetedRoom)
    return movePlayer(player, targetedRoom)
  } catch (error) {
    return error.message
  }
}

function validateUse(player, item, puzzle) {
  validateItem(item)
  if (!playerHasItem(player, item)) {
    throw new PlayerDoesntHaveItem(`Player doesn't have this item (${item}).`)
  }
  if (!usuable(puzzle, item)) {
    throw new ItemIsUnusable("You can't use this item here.")
  }
}

function playerHasItem(player, item) {
  return [...player.inventory].includes(item)
}

function usuable(puzzle, item) {
  item = itemLookUp[item]
  return item.puzzleCode === puzzle.answer
}

function verifyLastPuzzle(puzzle, item) {
  try {
    item = itemLookUp[item]
    return puzzle.name === 'oldAltar' && item.name === 'paper'
  } catch (error) {
    return false
  }
}

async function promptForLastPuzzle(puzzle) {
  let answer = await ask('Now you must recite the ancient incantation: ')
  if (puzzle.answer === answer) {
    return puzzle.solvedMessage
  } else {
    return puzzle.wrongAnswer
  }
  return process.exit()
}

exports.use = use
