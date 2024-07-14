const {puzzleLookup} = require('../helpers/puzzlesLookup')
const {ItemDoesntExist, PlayerDoesntHaveItem, ItemIsUnusable, NoItemSelected} = require('../errors/itemErrors')
const {setPuzzleIsSolved} = require('../helpers/setPuzzleIsSolved')
const {print} = require('../helpers/print')
const {movePlayer} = require('../helpers/movePlayer')
const {validateItem} = require('../helpers/validateItem')
const {removeItemFromPlayer} = require('../helpers/removeItemFromPlayer')
const {getObjectName} = require('../helpers/getFunctions')
const {itemNameLookUp} = require('../helpers/lookUps')
const {itemLookUp} = require('../helpers/itemsLookUp')
const {validateUse} = require('../validation/validateUse')
const {printOutput} = require('../helpers/printOutput')

async function use(player, item, targetedRoom) {
  let puzzle = puzzleLookup[targetedRoom]
  item = getObjectName(item, itemNameLookUp)
  try {
    if (verifyLastPuzzle(puzzle, item)) {
      printOutput('You burned the magical paper')
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
