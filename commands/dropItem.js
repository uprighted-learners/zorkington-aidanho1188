const {itemNameLookUp} = require('../helpers/lookUps')
const {addItemToRoom} = require('../helpers/roomItems')
const {removeItemFromPlayer} = require('../helpers/removeItemFromPlayer')
const {ItemDoesntExist, PlayerDoesntHaveItem, NoItemSelected} = require('../errors/itemErrors')
const {checkItemExist} = require('../helpers/checkItemExist')
const {getObjectName} = require('../helpers/getFunctions')

function drop(player, item) {
  console.log(item)
  console.log(typeof item)
  item = getObjectName(item, itemNameLookUp)
  console.log(item)

  try {
    validateDrop(player, item)
    removeItemFromPlayer(player, item)
    addItemToRoom(player.location, itemNameLookUp[item][0])
  } catch (error) {
    throw error
  }
}

function validateDrop(player, item) {
  if (!checkItemExist(item)) {
    throw new ItemDoesntExist('Item not found. Please try again. 🔄')
  }
  if (!hasItem(player, item)) {
    throw new PlayerDoesntHaveItem("You can't drop this item! It doesn't exist in your inventory. 🔄")
  }
}

function hasItem(player, item) {
  return [...player.inventory].includes(item)
}
exports.drop = drop
