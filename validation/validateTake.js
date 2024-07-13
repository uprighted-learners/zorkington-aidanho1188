const {itemLookUp} = require('../helpers/itemsLookUp')
const {getObjectName} = require('../helpers/getFunctions')
const {itemIsPresent} = require('../helpers/itemIsPresent')
const {NoItemSelected, ItemIsNotPresent, ItemDoesntExist, ItemIsNotTabkeable} = require('../errors/itemErrors')
const {checkItemExist} = require('../helpers/checkItemExist')
const {playerHasItem} = require('../helpers/playerHasItem')

function validateTake(player, item) {
  checkItemExist(item)
  if (!itemIsPresent(player, item)) {
    if (playerHasItem(player, item)) {
      throw new ItemIsNotTabkeable('You already have this item in your inventory. 🚫')
    }
    throw new ItemIsNotPresent("You can't take this item! It doesn't exist in this room. 🔄")
  }
  if (!isTakeable(item)) {
    throw new ItemIsNotTabkeable('You are not allow to take this item. 🚫')
  }
}

function isTakeable(item) {
  item = itemLookUp[item]
  return item.isTakeable
}

module.exports = {validateTake, isTakeable}
