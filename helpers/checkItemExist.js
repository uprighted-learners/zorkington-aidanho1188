const {itemLookUp} = require("./itemsLookUp");

function checkItemExist(item) {
  return itemLookUp.hasOwnProperty(item);
}
exports.checkItemExist = checkItemExist;
