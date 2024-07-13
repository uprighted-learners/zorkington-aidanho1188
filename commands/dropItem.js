const {itemNameLookUp} = require('../helpers/lookUps')
const {addItemToRoom} = require('../helpers/roomItems')
const {removeItemFromPlayer} = require('../helpers/removeItemFromPlayer')
const {ItemDoesntExist, PlayerDoesntHaveItem, NoItemSelected} = require('../errors/itemErrors')
const {validateItem} = require('../helpers/validateItem')
const {getObjectName} = require('../helpers/getFunctions')
const {validateDrop} = require('../validation/validateDrop')
const {itemLookUp} = require('../helpers/itemsLookUp')

function drop(player, item) {
  item = getObjectName(item, itemNameLookUp)
  try {
    validateDrop(player, item)
    item = itemLookUp[item].name
    removeItemFromPlayer(player, item)
    addItemToRoom(player.location, item)
    return `You dropped the ${item}. 📚`
  } catch (error) {
    throw error
  }
}

exports.drop = drop
