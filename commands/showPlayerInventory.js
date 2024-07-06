const {EmptyInventory} = require('../errors/itemErrors')
const {print} = require('../helpers/print')

function showPlayerInventory(player) {
  try {
    validateInventory(player)
    return `Your inventory: ${[...player.inventory].map((item) => item)}`
  } catch (error) {
    throw error
  }
}

function validateInventory(player) {
  if (!hasItem(player.inventory)) {
    throw new EmptyInventory('You inventory is empty')
  }
}

function hasItem(inventory) {
  return inventory.length > 0
}
exports.showPlayerInventory = showPlayerInventory
