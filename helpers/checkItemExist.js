const {itemLookUp} = require('./itemsLookUp')

function checkItemExist(item) {
  if (!item && typeof item === 'boolean') {
    throw new Error('No item selected! 🚫')
  }
  if (!itemLookUp.hasOwnProperty(item)) {
    throw new Error('Item not found. Please try again. 🔄')
  }
  return true
}

exports.checkItemExist = checkItemExist
