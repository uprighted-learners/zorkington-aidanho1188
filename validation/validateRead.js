const {itemLookUp} = require('../helpers/itemsLookUp')
const {itemIsPresent} = require('../helpers/itemIsPresent')
const {NoItemSelected, ItemDoesntExist, ItemIsUnreadable, ItemIsNotPresent} = require('../errors/itemErrors')
const {playerHasItem} = require('../helpers/playerHasItem')
const {validateItem} = require('../helpers/validateItem')

function validateRead(player, item) {
  validateItem(item)
  // dead code: all items are readable atm
  if (!readable(item)) {
    throw new ItemIsUnreadable('Item description not available. Please try again. 🔄')
  }

  if (!itemIsPresent(player, item)) {
    if (!playerHasItem(player, item)) {
      throw new ItemIsNotPresent("You don't have access to this item. 🚫")
    }
  }
}

function readable(item) {
  item = itemLookUp[item]
  return item.description !== null
}

module.exports = {validateRead}
