const {itemNameLookUp, locationLookUp} = require('./lookUps')
const {itemLookUp} = require('./itemsLookUp')
const {getObjectName} = require('./getFunctions')
const {playerHasItem} = require('./playerHasItem')

// BUG: can't read items in inventory
function itemIsPresent(player, item) {
  const itemObjectName = getObjectName(item, itemNameLookUp)
  const locationItems = locationLookUp[player.location].inventory

  if (playerHasItem(player, itemObjectName)) {
    return true
  }

  return itemLookUp.hasOwnProperty(itemObjectName) && checkAvailableItem(itemObjectName, locationItems)
}

function checkAvailableItem(itemObjectName, availableItems) {
  for (let i = 0; i < availableItems.length; i++) {
    if (getObjectName(availableItems[i], itemNameLookUp) === itemObjectName) {
      return true
    }
  }

  return false
}

exports.itemIsPresent = itemIsPresent
