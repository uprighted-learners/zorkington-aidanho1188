const {locationState, locationLookUp} = require("../helpers/lookUps");
const {RoomDoesntExistError, MoveRoomError, NotUnlockedError} = require("../errors/moveRoomErrors");

function moveRoom(player, targetedRoom) {
  let currentRoom = player.location;
  try {
    validateMove(currentRoom, targetedRoom);
    player.location = targetedRoom;
    return true;
  } catch (error) {
    throw error;
  }
}

function validateMove(currentRoom, targetedRoom) {
  if (!checkRoomExists(targetedRoom)) {
    throw new RoomDoesntExistError("Room does not exist!");
  }

  let isUnLocked = locationLookUp[targetedRoom].isUnlocked;
  const isValidMove = locationState[currentRoom].includes(targetedRoom);

  if (!isValidMove) {
    throw new MoveRoomError("You can't move to this room! 🚫");
  }
  if (isValidMove && !isUnLocked) {
    throw new NotUnlockedError("Please solve the puzzle first!");
  }
}

function checkRoomExists(targetedRoom) {
  return locationLookUp.hasOwnProperty(targetedRoom);
}
exports.moveRoom = moveRoom;
