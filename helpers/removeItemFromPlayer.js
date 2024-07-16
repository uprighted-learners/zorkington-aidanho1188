function removeItemFromPlayer(player, item) {
  let itemIndex = player.inventory.indexOf(item)
  console.log('itemIndex:', itemIndex)
  if (itemIndex !== -1) {
    player.inventory.splice(itemIndex, 1)
  }
  console.log('player.inventory:', player.inventory)
}
exports.removeItemFromPlayer = removeItemFromPlayer
