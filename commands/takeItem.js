const {getObjectName} = require('../helpers/getFunctions')
const {removeItemFromRoom} = require('../helpers/roomItems')
const {validateTake} = require('../validation/validateTake')
const {itemNameLookUp} = require('../helpers/lookUps')

function take(player, item) {
  const itemObjectName = getObjectName(item, itemNameLookUp)
  try {
    validateTake(player, itemObjectName)
    player.inventory.push(itemObjectName)
    removeItemFromRoom(player.location, itemObjectName)
    return `You took the ${itemObjectName}. 📚`
  } catch (error) {
    throw error
  }
}

exports.take = take
