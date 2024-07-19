import {handleUserCommand} from './index.js'
import Player from '@/classes/Player'
import {printOutput} from './helpers/printOutput'

const player = new Player()
window.IS_PUZZLE = false

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('input')
  let startExecuted = false
  // print welcome message
  startGame()

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !IS_PUZZLE) {
      const command = input.value
      executeCommand(command)
      input.value = ''
    }
  })

  async function executeCommand(command) {
    let result
    let lowerCaseCommand = command.toLowerCase()
    printOutput(`> ${command}`)
    if (!startExecuted && lowerCaseCommand !== 'start' && lowerCaseCommand !== 'help') {
      printOutput('Please start the game using the "start" command.')
      return
    }
    switch (lowerCaseCommand) {
      case 'start':
        if (!startExecuted) {
          result = await handleUserCommand(player, 'look')
          startExecuted = true
        } else {
          result = 'The game has already started.'
        }
        break
      case 'help':
        result = 'Available commands: start, help, about, go, i, look, read, open, burn, drop, use, exit game'
        break
      case 'about':
        result = 'This is a JavaScript game console.'
        break
      case 'exit game':
        result = 'Goodbye!'
        printOutput(result)
        printOutput('You will be redirected to the home page in 5 seconds...')
        await disableInputTemporarily(input, 5000)
        window.location.href = './'
        return
      default:
        result = await handleUserCommand(player, command)
        break
    }
    if (result) {
      printOutput(result)
    }
  }
})

async function disableInputTemporarily(input, time) {
  input.disabled = true
  await new Promise((resolve) => setTimeout(resolve, time))
  input.disabled = false
}

function startGame() {
  printOutput('Welcome to Zorkington!')
  printOutput('Type "help" for a list of commands.')
  printOutput('Type "start" to begin the game.')
}
