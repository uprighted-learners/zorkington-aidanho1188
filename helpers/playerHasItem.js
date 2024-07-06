function playerHasItem(player, item) {
  return [...player.inventory].includes(item)
}

exports.playerHasItem = playerHasItem
