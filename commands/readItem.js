const {itemLookUp} = require('../helpers/itemsLookUp')
const {itemNameLookUp} = require('../helpers/lookUps')
const {getObjectName} = require('../helpers/getFunctions')
const {validateRead} = require('../validation/validateRead')

function read(player, item) {
  item = getObjectName(item, itemNameLookUp)
  try {
    console.log('item', item)
    validateRead(player, item)
    item = itemLookUp[item]
    return `${item.description}`
  } catch (error) {
    throw error
  }
}

exports.read = read
