const {itemNameLookUp} = require("../helpers/lookUps");
const {itemLookUp} = require("../helpers/itemsLookUp");
const {getObjectName} = require("../helpers/getFunctions");
const {print} = require("../helpers/print");
const {itemIsPresent} = require("../helpers/itemIsPresent");
const {removeItemFromRoom} = require("../helpers/roomItems");
const {ItemIsNotPresent, ItemDoesntExist, ItemIsNotTabkeable} = require("../errors/itemErrors");
const {checkItemExist} = require("../helpers/checkItemExist");

function take(player, item) {
  const itemObjectName = getObjectName(item, itemNameLookUp);
  try {
    validateTake(player, item);
    player.inventory.push(itemObjectName);
    removeItemFromRoom(player.location, itemObjectName);
  } catch (error) {
    throw error;
  }
}

function validateTake(player, item) {
  if (!itemIsPresent(player, item)) {
    throw new ItemIsNotPresent("You can't take , ItemIsNotTabkeablethis item.");
  }
  if (!checkItemExist(item)) {
    throw new ItemDoesntExist("This item does not exist.");
  }
  if (!isTakeable(item)) {
    throw new ItemIsNotTabkeable("You are not allow to take this item.");
  }
}

function isTakeable(item) {
  return item.isTakeable;
}

exports.take = take;
