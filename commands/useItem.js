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
const {promptInput} = require('../helpers/displayPuzzle')
const {playerHasItem} = require('../helpers/playerHasItem')

async function use(player, item, targetedRoom) {
  console.log('use item:', item)
  let puzzle = puzzleLookup[targetedRoom]
  item = getObjectName(item, itemNameLookUp)
  try {
    console.log('item:', item)
    console.log('inventory:', playerHasItem(player, item))
    if (verifyLastPuzzle(puzzle, item)) {
      if (playerHasItem(player, item)) {
        printOutput('You burned the magical paper')
        removeItemFromPlayer(player, item)
        return await promptForLastPuzzle(puzzle)
      } else {
        printOutput('You do not have the paper to burn. 🔥')
        return false
      }
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
  let answer = await promptInput('Now you must recite the ancient incantation: ')
  printOutput(`> ${answer}`)
  if (answer === puzzle.answer) {
    printOutput(puzzle.solvedMessage)
  } else {
    printOutput(puzzle.wrongAnswer)
    printOutput('Game over. You have been enveloped by a malevolent force. 😱')
  }
  document.getElementById('input').value = ''
  return 'endGame!'
}

exports.use = use
