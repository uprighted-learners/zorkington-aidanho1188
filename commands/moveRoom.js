const {locationState, locationLookUp, roomNameLookup} = require("../helpers/lookUps");
const {RoomDoesntExistError, MoveRoomError, NotUnlockedError} = require("../errors/roomErrors");
const {movePlayer} = require("../helpers/movePlayer");
const {getObjectName} = require("../helpers/getFunctions");

async function moveRoom(player, targetedRoom) {
  targetedRoom = getObjectName(targetedRoom, roomNameLookup);
  let currentRoom = player.location;
  try {
    validateMove(currentRoom, targetedRoom);
    movePlayer(player, targetedRoom);
    return true;
  } catch (error) {
    if (error instanceof NotUnlockedError) {
      console.log(error.message);
      targetedRoom = getObjectName(targetedRoom, roomNameLookup);
      await displayRoomPuzzle(targetedRoom);
    } else {
      throw error;
    }
  }
}

function validateMove(currentRoom, targetedRoom) {
  if (!checkRoomExists(targetedRoom)) {
    throw new RoomDoesntExistError("Room does not exist!");
  }
  if (!checkValidMove(currentRoom, targetedRoom)) {
    throw new MoveRoomError("You can't move to this room! 🚫");
  }
  if (!solvePuzzle(currentRoom, targetedRoom)) {
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
  return !(checkValidMove(currentRoom, targetedRoom) && !checkUnlocked(targetedRoom));
}
exports.moveRoom = moveRoom;
