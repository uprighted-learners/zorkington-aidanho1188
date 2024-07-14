const {itemLookUp} = require('../helpers/itemsLookUp')

function playerHasItem(player, item) {
  item = itemLookUp[item].name
  // TODO: remove console.log
  console.log('item', item)
  console.log('player.inventory', player.inventory)
  return [...player.inventory].includes(item)
}

exports.playerHasItem = playerHasItem
