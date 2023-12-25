const {locationState} = require("./helpers./lookUps.js"); // module not found error
const {locationLookUp} = require("index.js");

async function moveRoom(player, targetedRoom) {
  let currentRoom = player.location;
  try {
    validateMove(player, currentRoom, targetedRoom);
    player.location = targetedRoom;
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
}

function validateMove(player, currentRoom, targetedRoom) {
  let isUnLocked = locationLookUp[targetedRoom].isUnlocked;
  const isValidMove = locationState[currentRoom].includes(targetedRoom) && isUnLocked;

  if (!isValidMove) {
    throw new Error("You can't move to this room! 🚫");
  }
  if (!isUnLocked) {
    throw new Error("Please solve the puzzle first!");
  }
}
exports.moveRoom = moveRoom;
