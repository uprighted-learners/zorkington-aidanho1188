const {puzzleLookup} = require('../helpers/puzzlesLookup')
const {movePlayer} = require('../helpers/movePlayer')
const {printOutput} = require('../helpers/printOutput')
const {setPuzzleIsSolved} = require('../helpers/setPuzzleIsSolved')
const {use} = require('../commands/useItem')
const {getCommand, getTarget, validateCommandKey} = require('../helpers/getFunctions')

async function displayRoomPuzzle(player, targetedRoom) {
  let puzzle = puzzleLookup[targetedRoom]
  let input = ''

  printOutput(`${puzzle.message}`)
  while (!puzzle.isSolved) {
    input = await promptInput(puzzle, puzzle.promptMessage)
    printOutput(`> ${input}`)
    if (input === puzzle.answer) {
      setPuzzleIsSolved(puzzle, targetedRoom)
      movePlayer(player, targetedRoom)
      break
    } else if (input === 'back') {
      printOutput('You have returned to the room.')
      break
    } else if (hasUseCommand(input)) {
      let inputArr = input.trim().split(' ') // TODO: write this in another function
      let item = getTarget(inputArr)
      let usuable = await use(player, item, targetedRoom)
      if (usuable === true) {
        return true
      }
    } else {
      console.log('input:', input)
      printOutput(puzzle.wrongAnswer)
      console.log('this is working')
    }
  }
  document.getElementById('input').value = ''
  return
}

async function promptInput(puzzle, promptMessage) {
  printOutput(`${puzzle.promptMessage}`)
  return new Promise((resolve) => {
    const input = document.getElementById('input')
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && IS_PUZZLE) {
        resolve(input.value)
      }
    })
    input.value = ''
  })
}

function hasUseCommand(input) {
  let inputArr = input.trim().split(' ')
  let command = getCommand(inputArr)
  return validateCommandKey(command)
}

export {displayRoomPuzzle}
