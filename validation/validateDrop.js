const {itemNameLookUp} = require('../helpers/lookUps')
const {addItemToRoom} = require('../helpers/roomItems')
const {removeItemFromPlayer} = require('../helpers/removeItemFromPlayer')
const {ItemDoesntExist, PlayerDoesntHaveItem, NoItemSelected} = require('../errors/itemErrors')
const {validateItem} = require('../helpers/validateItem')
const {getObjectName} = require('../helpers/getFunctions')

function validateDrop(player, item) {
  validateItem(item)
  if (!hasItem(player, item)) {
    throw new PlayerDoesntHaveItem("You can't drop this item! It doesn't exist in your inventory. 🔄")
  }
}

function hasItem(player, item) {
  return [...player.inventory].includes(item)
}

module.exports = {validateDrop}
