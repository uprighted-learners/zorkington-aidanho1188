const {getObjectName} = require('../helpers/getFunctions')
const {removeItemFromRoom} = require('../helpers/roomItems')
const {validateTake} = require('../validation/validateTake')
const {itemNameLookUp} = require('../helpers/lookUps')
const {itemLookUp} = require('../helpers/itemsLookUp')

function take(player, item) {
  const itemObjectName = getObjectName(item, itemNameLookUp)
  try {
    validateTake(player, itemObjectName)
    let itemName = itemLookUp[itemObjectName].name
    player.inventory.push(itemName)
    removeItemFromRoom(player.location, itemObjectName)
    return `You took the ${itemName}. 📚`
  } catch (error) {
    throw error
  }
}

exports.take = take
