const {validateInventory} = require('../validation/validateInventory')

function showPlayerInventory(player) {
  try {
    validateInventory(player)
    let playerInventory = player.inventory.join(', ')
    return `You are carrying: ${playerInventory}`
  } catch (error) {
    throw error
  }
}

exports.showPlayerInventory = showPlayerInventory
