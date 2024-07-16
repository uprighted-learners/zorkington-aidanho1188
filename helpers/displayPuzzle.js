const {puzzleLookup} = require('../helpers/puzzlesLookup')
const {movePlayer} = require('../helpers/movePlayer')
const {printOutput} = require('../helpers/printOutput')
const {setPuzzleIsSolved} = require('../helpers/setPuzzleIsSolved')
const {use} = require('../commands/useItem')
const {getCommand, getTarget, validateCommandKey} = require('../helpers/getFunctions')
const {itemLookUp} = require('../helpers/itemsLookUp')

async function displayRoomPuzzle(player, targetedRoom) {
  let puzzle = puzzleLookup[targetedRoom]
  let lastPuzzle = puzzle
  let input = ''

  printOutput(`${puzzle.message}`)
  while (!puzzle.isSolved) {
    input = await promptInput(puzzle.promptMessage)
    printOutput(`> ${input}`)
    if (input === puzzle.answer) {
      setPuzzleIsSolved(puzzle, targetedRoom)
      movePlayer(player, targetedRoom)
      break
    } else if (input === 'back') {
      printOutput('You have exited the puzzle.')
      break
    } else if (hasUseCommand(input)) {
      let inputArr = input.trim().split(' ') // TODO: write this in another function
      let item = getTarget(inputArr)
      let usuable = await use(player, item, targetedRoom)
      if (usuable) {
        if (usuable === 'endGame!') {
          return playAgain()
        }
        return true
      }
    } else if (puzzle.name === 'oldAltar') {
      printOutput('Please burn the paper on the altar.')
    } else {
      printOutput(puzzle.wrongAnswer)
    }
  }
  document.getElementById('input').value = ''
  return
}

export async function promptInput(promptMessage) {
  printOutput(`${promptMessage}`)
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

async function playAgain() {
  let answer = await promptInput('Play again? (yes/no): ')
  printOutput(`> ${answer}`)
  if (answer.toLowerCase() === 'yes') {
    printOutput("Great! Let's play again! 🎮")
    printOutput('Game restarting...')
    document.getElementById('input').disabled = true

    setTimeout(() => {
      window.location.href = '/'
    }, 3000)
  } else {
    document.getElementById('input').disabled = true
    return printOutput('Thank you for playing! 🎉')
  }
}

export {displayRoomPuzzle}
