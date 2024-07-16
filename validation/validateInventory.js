const {EmptyInventory} = require('../errors/itemErrors')

function validateInventory(player) {
  if (!hasItem(player.inventory)) {
    throw new EmptyInventory('Your inventory is empty.')
  }
}

function hasItem(inventory) {
  return inventory.length > 0
}

module.exports = {validateInventory}
