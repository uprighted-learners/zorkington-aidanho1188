const {Item} = require('./classes/Item')
const {Player} = require('./classes/Player')
const {roomNameLookup, locationState} = require('./helpers/lookUps')
const {puzzleLookup} = require('./helpers/puzzlesLookup')
const {displayRoom} = require('./helpers/displayRoom')
const {getCommand, validateCommandKey, getTarget, getCurrentLocation} = require('./helpers/getFunctions')
const {print} = require('./helpers/print')
const {moveRoom} = require('./commands/moveRoom')
const {setPuzzleIsSolved} = require('./helpers/setPuzzleIsSolved')
const {use} = require('./commands/useItem')
const {movePlayer} = require('./helpers/movePlayer')
const {prompt} = require('./helpers/prompt')
const {read} = require('./commands/readItem')
const {look} = require('./commands/look')
const {endGame} = require('./commands/endGame')
const {showPlayerInventory} = require('./commands/showPlayerInventory')
const {take} = require('./commands/takeItem')
const {removeItemFromRoom} = require('./helpers/roomItems')
const {drop} = require('./commands/dropItem')

const player = new Player()

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
start()

// * Main game logics
async function start() {
  displayRoom(getCurrentLocation(player))
  await gameLoop(player)
  process.exit()
}

async function gameLoop(player) {
  do {
    let answer = await prompt()
    await handleUserCommand(answer)
    displayRoom(getCurrentLocation(player))
  } while (player.answer !== 'exit')
}

async function handleUserCommand(answer) {
  let answerArr = answer.trim().split(' ')
  let command = getCommand(answerArr)
  let target = getTarget(answerArr)
  let commandKey = validateCommandKey(command)
  let commandFunction = commandFunctionLookUp[commandKey]
  try {
    await commandFunction(player, target)
  } catch (error) {
    if (!commandFunction) {
      console.log(answer, 'is not a valid command')
    } else {
      console.log(error.message)
    }
  }
}

// * Puzzle functions

function hasUseCommand(input) {
  let inputArr = input.trim().split(' ')
  let command = getCommand(inputArr)
  return validateCommandKey(command)
}
