const {itemLookUp} = require('../helpers/itemsLookUp')
const {itemIsPresent} = require('../helpers/itemIsPresent')
const {NoItemSelected, ItemDoesntExist, ItemIsUnreadable, ItemIsNotPresent} = require('../errors/itemErrors')
const {print} = require('../helpers/print')
const {itemNameLookUp} = require('../helpers/lookUps')
const {getObjectName} = require('../helpers/getFunctions')
const {playerHasItem} = require('../helpers/playerHasItem')
const {checkItemExist} = require('../helpers/checkItemExist')
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
