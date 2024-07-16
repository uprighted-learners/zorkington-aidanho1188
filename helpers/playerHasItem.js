const {itemLookUp} = require('../helpers/itemsLookUp')

function playerHasItem(player, item) {
  try {
    item = itemLookUp[item].name
    console.log('item', item)
    console.log('player.inventory', player.inventory)
    return [...player.inventory].includes(item)
  } catch (error) {
    return false
  }
}

exports.playerHasItem = playerHasItem
