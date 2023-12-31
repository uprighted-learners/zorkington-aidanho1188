const {itemNameLookUp} = require("../helpers/lookUps");
const {itemLookUp} = require("../helpers/itemsLookUp");
const {print} = require("../helpers/print");
const {addItemToRoom} = require("../helpers/roomItems");
const {player} = require("..");

function drop(player, item) {
  if (itemLookUp.hasOwnProperty(item) && [...player.inventory].includes(item)) {
    removeItemFromPlayer(player, item);
    addItemToRoom(player.location, itemNameLookUp[item][0]);
    return print(`You dropped a ${item} 🤚`);
  } else if (![...player.inventory].includes(item)) {
    return print(`You don't have this ${item} to drop 😕`);
  } else {
    return print(`You can't drop this ${itemName} 🚫`);
  }
}
exports.drop = drop;
