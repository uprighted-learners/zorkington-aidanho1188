const {itemLookUp} = require('../helpers/itemsLookUp')
const {itemIsPresent} = require('../helpers/itemIsPresent')
const {NoItemSelected, ItemDoesntExist, ItemIsUnreadable, PlayerDoesntHaveItem, ItemIsNotPresent} = require('../errors/itemErrors')
const {print} = require('../helpers/print')
const {itemNameLookUp} = require('../helpers/lookUps')
const {getObjectName} = require('../helpers/getFunctions')
const {playerHasItem} = require('../helpers/playerHasItem')

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

function validateRead(player, item) {
  if (!item && typeof item === 'boolean') {
    throw new NoItemSelected('Please provide an item to read. 📚')
  }
  if (!itemDoesExist(item)) {
    throw new ItemDoesntExist('Item not found. Please try again. 🔄')
  }
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

function itemDoesExist(item) {
  return itemLookUp.hasOwnProperty(item)
}

function readable(item) {
  item = itemLookUp[item]
  return item.description !== null
}

exports.read = read
