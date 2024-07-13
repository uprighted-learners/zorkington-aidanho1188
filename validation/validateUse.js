const {ItemDoesntExist, PlayerDoesntHaveItem, ItemIsUnusable, NoItemSelected} = require('../errors/itemErrors')
const {validateItem} = require('../helpers/validateItem')
const {itemLookUp} = require('../helpers/itemsLookUp')

function validateUse(player, item, puzzle) {
  validateItem(item)
  if (!playerHasItem(player, item)) {
    throw new PlayerDoesntHaveItem(`Player doesn't have this item (${item}).`)
  }
  if (!usuable(puzzle, item)) {
    throw new ItemIsUnusable("You can't use this item here.")
  }
}

function playerHasItem(player, item) {
  return [...player.inventory].includes(item)
}

function usuable(puzzle, item) {
  item = itemLookUp[item]
  return item.puzzleCode === puzzle.answer
}

module.exports = {validateUse}
