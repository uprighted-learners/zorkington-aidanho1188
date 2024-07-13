const {roomNameLookup} = require('../helpers/lookUps')
const {NotUnlockedError} = require('../errors/roomErrors')
const {movePlayer} = require('../helpers/movePlayer')
const {getObjectName} = require('../helpers/getFunctions')
const {puzzleLookup} = require('../helpers/puzzlesLookup')
const {printOutput} = require('../helpers/printOutput')
const {displayRoomPuzzle} = require('../helpers/displayPuzzle')
const {validateMove} = require('../validation/validateMove')

async function moveRoom(player, targetedRoom) {
  targetedRoom = getObjectName(targetedRoom, roomNameLookup)
  let currentRoom = player.location
  try {
    validateMove(currentRoom, targetedRoom)
    return movePlayer(player, targetedRoom)
  } catch (error) {
    if (error instanceof NotUnlockedError) {
      let puzzle = puzzleLookup[targetedRoom]
      IS_PUZZLE = true
      printOutput(error.message)
      await displayRoomPuzzle(player, targetedRoom)
      IS_PUZZLE = false
      return
    } else {
      throw error
    }
  }
}

export {moveRoom}
