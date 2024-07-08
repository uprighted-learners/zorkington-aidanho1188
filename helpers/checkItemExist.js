const {itemLookUp} = require('./itemsLookUp')

function checkItemExist(item) {
  console.log('item', item)
  console.log('itemLookUp', itemLookUp)
  console.log('itemLookUp.hasOwnProperty(item)', itemLookUp.hasOwnProperty(item))
  return itemLookUp.hasOwnProperty(item)
}
exports.checkItemExist = checkItemExist
