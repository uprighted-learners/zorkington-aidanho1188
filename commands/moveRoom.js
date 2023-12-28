const {locationState, locationLookUp} = require("../helpers/lookUps");
const {RoomDoesntExistError, MoveRoomError, NotUnlockedError} = require("../errors/moveRoomErrors");
const {movePlayer} = require("../helpers/movePlayer");

function moveRoom(player, targetedRoom) {
  let currentRoom = player.location;
  try {
    validateMove(currentRoom, targetedRoom);
    movePlayer(player, targetedRoom);
    return true;
  } catch (error) {
    throw error;
  }
}

function validateMove(currentRoom, targetedRoom) {
  if (!checkRoomExists(targetedRoom)) {
    throw new RoomDoesntExistError("Room does not exist!");
  }
  if (!checkValidMove(currentRoom, targetedRoom)) {
    throw new MoveRoomError("You can't move to this room! 🚫");
  }
  if (solvePuzzle(currentRoom, targetedRoom)) {
    throw new NotUnlockedError("Please solve the puzzle first!");
  }
}

function checkRoomExists(targetedRoom) {
  return locationLookUp.hasOwnProperty(targetedRoom);
}

function checkValidMove(currentRoom, targetedRoom) {
  return locationState[currentRoom].includes(targetedRoom);
}

function checkUnlocked(targetedRoom) {
  return locationLookUp[targetedRoom].isUnlocked;
}

function solvePuzzle(currentRoom, targetedRoom) {
  return checkValidMove(currentRoom, targetedRoom) && !checkUnlocked(targetedRoom);
}
exports.moveRoom = moveRoom;
