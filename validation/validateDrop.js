const {itemNameLookUp} = require('../helpers/lookUps')
const {addItemToRoom} = require('../helpers/roomItems')
const {removeItemFromPlayer} = require('../helpers/removeItemFromPlayer')
const {ItemDoesntExist, PlayerDoesntHaveItem, NoItemSelected} = require('../errors/itemErrors')
const {validateItem} = require('../helpers/validateItem')
const {getObjectName} = require('../helpers/getFunctions')
const {playerHasItem} = require('../helpers/playerHasItem')

function validateDrop(player, item) {
  validateItem(item)
  if (!playerHasItem(player, item)) {
    throw new PlayerDoesntHaveItem("You can't drop this item! It doesn't exist in your inventory. 🔄")
  }
}

module.exports = {validateDrop}
