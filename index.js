import Item from './classes/Item'
import Player from './classes/Player'
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

const commandFunctionLookUp = {
  read: read,
  look: look,
  inventory: showPlayerInventory,
  use: use,
  drop: drop,
  take: take,
  go: moveRoom,
  endGame: endGame,
}
// start()

// * Main game logics
// export async function start() {
//   displayRoom(getCurrentLocation(player))
//   await gameLoop(player)
//   process.exit()
// }

// export async function gameLoop(player) {
//   do {
//     let answer = await prompt()
//     await handleUserCommand(answer)
//     displayRoom(getCurrentLocation(player))
//   } while (player.answer !== 'exit')
// }

export async function handleUserCommand(player, answer) {
  let answerArr = answer.trim().split(' ')
  let command = getCommand(answerArr)
  let target = getTarget(answerArr)
  let commandKey = validateCommandKey(command)
  // console.log('commandKey', commandKey)
  let commandFunction = commandFunctionLookUp[commandKey]
  // console.log('commandFunction', commandFunction)
  try {
    return await commandFunction(player, target)
  } catch (error) {
    if (!answer) {
      return 'Please enter a command'
    } else if (!commandFunction) {
      return `${answer} is not a valid command`
    } else {
      return `${error.message}`
    }
  }
}
