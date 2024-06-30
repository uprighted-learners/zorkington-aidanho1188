import {handleUserCommand} from './index.js'
import {Item} from './classes/Item'
import {Player} from './classes/Player'
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

const player = new Player()

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('input')
  const output = document.getElementById('output')

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const command = input.value
      executeCommand(command)
      input.value = ''
    }
  })

  async function executeCommand(command) {
    let result
    // console.log('command', command)
    switch (command.toLowerCase()) {
      // console.log('command', command)
      case 'start':
        result = 'Starting the game...'
        break
      case 'help':
        result = 'Available commands: start, help, about, go, i, look, read, open, burn, drop, use, exit'
        break
      case 'about':
        result = 'This is a JavaScript game console.'
        break
      case 'exit':
        result = 'Goodbye!'
        break
    }

    result = await handleUserCommand(player, command)
    printOutput(displayRoom(getCurrentLocation(player)))
    printOutput(result)
  }

  function printOutput(text) {
    const outputDiv = document.createElement('div')
    outputDiv.textContent = text
    output.appendChild(outputDiv)
    output.scrollTop = output.scrollHeight
  }
})
