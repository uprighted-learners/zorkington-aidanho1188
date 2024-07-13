function showPlayerInventory(player) {
  try {
    validateInventory(player)
    return `Your inventory: ${[...player.inventory].map((item) => item)}`
  } catch (error) {
    throw error
  }
}

exports.showPlayerInventory = showPlayerInventory
