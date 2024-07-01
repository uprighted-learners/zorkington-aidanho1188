const {itemNameLookUp, locationLookUp} = require("./lookUps");
const {getObjectName} = require("./getFunctions");

function removeItemFromRoom(currentLocation, removeItem) {
  removeItem = getObjectName(removeItem, itemNameLookUp);
  let location = locationLookUp[currentLocation];
  let itemIndex = location.inventory.indexOf(removeItem);
  location.inventory.splice(itemIndex, 1);
}
exports.removeItemFromRoom = removeItemFromRoom;

function addItemToRoom(currentLocation, addedItem) {
  let location = locationLookUp[currentLocation];
  location.inventory.push(addedItem);
}
exports.addItemToRoom = addItemToRoom;
