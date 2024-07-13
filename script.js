import {handleUserCommand} from './index.js'
import Item from '@/classes/Item'
import Player from '@/classes/Player'
import {roomNameLookup, locationState} from './helpers/lookUps'
import {puzzleLookup} from './helpers/puzzlesLookup'
import {displayRoom} from './helpers/displayRoom'
import {getCommand, validateCommandKey, getTarget, getCurrentLocation} from './helpers/getFunctions'
import {print} from './helpers/print'
import {moveRoom} from './commands/moveRoom'
import {setPuzzleIsSolved} from './helpers/setPuzzleIsSolved'
import {use} from './commands/useItem'
import {movePlayer} from './helpers/movePlayer'
import {read} from './commands/readItem'
import {look} from './commands/look'
import {endGame} from './commands/endGame'
import {showPlayerInventory} from './commands/showPlayerInventory'
import {take} from './commands/takeItem'
import {removeItemFromRoom} from './helpers/roomItems'
import {drop} from './commands/dropItem'
import {printOutput} from './helpers/printOutput'

const player = new Player()
window.IS_PUZZLE = false

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('input')
  // print welcome message
  printOutput('Welcome to Zorkington!')

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !IS_PUZZLE) {
      const command = input.value
      executeCommand(command)
      input.value = ''
    }
  })

  async function executeCommand(command) {
    let result
    printOutput(`> ${command}`)
    switch (command.toLowerCase()) {
      case 'start':
        result = 'Starting the game...'
        break
      case 'help':
        result = 'Available commands: start, help, about, go, i, look, read, open, burn, drop, use, exit game'
        break
      case 'about':
        result = 'This is a JavaScript game console.'
        break
      case 'exit game':
        result = 'Goodbye!'
        // document.getElementById('input').disabled = true
        printOutput(result)
        printOutput('You will be redirected to the home page in 5 seconds...')
        setTimeout(() => {
          window.location.href = '/'
        }, 5000)
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
