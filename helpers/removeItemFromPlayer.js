function removeItemFromPlayer(player, item) {
  itemIndex = player.inventory.indexOf(item);
  player.inventory.splice(itemIndex, 1);
}
exports.removeItemFromPlayer = removeItemFromPlayer;
