const {itemNameLookUp} = require('../helpers/lookUps')
const {itemLookUp} = require('../helpers/itemsLookUp')
const {getObjectName} = require('../helpers/getFunctions')
const {print} = require('../helpers/print')
const {itemIsPresent} = require('../helpers/itemIsPresent')
const {removeItemFromRoom} = require('../helpers/roomItems')
const {NoItemSelected, ItemIsNotPresent, ItemDoesntExist, ItemIsNotTabkeable} = require('../errors/itemErrors')
const {checkItemExist} = require('../helpers/checkItemExist')

function take(player, item) {
  const itemObjectName = getObjectName(item, itemNameLookUp)
  try {
    validateTake(player, item)
    player.inventory.push(itemObjectName)
    removeItemFromRoom(player.location, itemObjectName)
  } catch (error) {
    throw error
  }
}

function validateTake(player, item) {
  if (!item) {
    throw new NoItemSelected('Please provide an item to take. 📚')
  }
  if (!itemIsPresent(player, item)) {
    throw new ItemIsNotPresent("You can't take this item! It doesn't exist in this room. 🔄")
  }
  if (!checkItemExist(item)) {
    throw new ItemDoesntExist('This item does not exist. Please try again. 🔄')
  }
  if (!isTakeable(item)) {
    throw new ItemIsNotTabkeable('You are not allow to take this item. 🚫')
  }
}

function isTakeable(item) {
  item = itemLookUp[item]
  return item.isTakeable
}

exports.take = take
