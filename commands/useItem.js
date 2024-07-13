const {puzzleLookup} = require('../helpers/puzzlesLookup')
const {ItemDoesntExist, PlayerDoesntHaveItem, ItemIsUnusable, NoItemSelected} = require('../errors/itemErrors')
const {setPuzzleIsSolved} = require('../helpers/setPuzzleIsSolved')
const {print} = require('../helpers/print')
const {movePlayer} = require('../helpers/movePlayer')
const {ask} = require('../helpers/prompt')
const {validateItem} = require('../helpers/validateItem')
const {removeItemFromPlayer} = require('../helpers/removeItemFromPlayer')
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
