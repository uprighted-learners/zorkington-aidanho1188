const {ItemDoesntExist, PlayerDoesntHaveItem, ItemIsUnusable, NoItemSelected} = require('../errors/itemErrors')
const {InvalidLocation} = require('../errors/roomErrors')
const {itemLookUp} = require('../helpers/itemsLookUp')
const {validateItem} = require('../helpers/validateItem')
const {playerHasItem} = require('../helpers/playerHasItem')

function validateUse(player, item, puzzle = null) {
  validateItem(item)
  if (!playerHasItem(player, item)) {
    throw new PlayerDoesntHaveItem(`You don't have access to this item. 🚫`)
  }
  if (!puzzle) {
    throw new InvalidLocation("You can't use this item here. 🔄")
  }
  if (!isUsable(puzzle, item)) {
    throw new ItemIsUnusable("You can't use this item here. 🔄")
  }
}

function isUsable(puzzle, item) {
  item = itemLookUp[item]
  return item.puzzleCode === puzzle.answer
}

module.exports = {validateUse}
