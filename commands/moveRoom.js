const {locationState, locationLookUp, roomNameLookup} = require('../helpers/lookUps')
const {NoRoomSelected, RoomDoesntExistError, MoveRoomError, NotUnlockedError} = require('../errors/roomErrors')
const {movePlayer} = require('../helpers/movePlayer')
const {getObjectName} = require('../helpers/getFunctions')
const {puzzleLookup} = require('../helpers/puzzlesLookup')
const {printOutput} = require('../helpers/printOutput')
const {displayRoomPuzzle} = require('../helpers/displayPuzzle')

async function moveRoom(player, targetedRoom) {
  console.log(typeof targetedRoom)
  targetedRoom = getObjectName(targetedRoom, roomNameLookup)
  console.log(typeof targetedRoom)
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

function validateMove(currentRoom, targetedRoom) {
  if (!targetedRoom && typeof targetedRoom === 'boolean') {
    throw new NoRoomSelected('No room selected! 🚫')
  }
  if (!checkRoomExists(targetedRoom)) {
    throw new RoomDoesntExistError('Room does not exist! 🚫')
  }
  if (!checkValidMove(currentRoom, targetedRoom)) {
    throw new MoveRoomError("You can't move to this room! 🚫")
  }
  if (!solvePuzzle(currentRoom, targetedRoom)) {
    throw new NotUnlockedError('Please solve the puzzle first! 🧩')
  }
}

function checkRoomExists(targetedRoom) {
  return locationLookUp.hasOwnProperty(targetedRoom)
}

function checkValidMove(currentRoom, targetedRoom) {
  return locationState[currentRoom].includes(targetedRoom)
}

function checkUnlocked(targetedRoom) {
  return locationLookUp[targetedRoom].isUnlocked
}

function solvePuzzle(currentRoom, targetedRoom) {
  return !(checkValidMove(currentRoom, targetedRoom) && !checkUnlocked(targetedRoom))
}

export {moveRoom}
