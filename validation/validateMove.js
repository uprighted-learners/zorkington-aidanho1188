const {locationState, locationLookUp} = require('../helpers/lookUps')
const {NoRoomSelected, RoomDoesntExistError, MoveRoomError, NotUnlockedError} = require('../errors/roomErrors')

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

module.exports = {validateMove}
