const fs = require("fs");
const itemsJsonData = fs.readFileSync("./data/itemsList.json");
const items = JSON.parse(itemsJsonData);

class Item {
  constructor(name, description, location, isTakeable) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.isTakeable = isTakeable;
  }
  
  getDescription = () => { return this.description; };
  getIsTakeable = () => { return this.isTakeable; };
}

const sign = new Item(items[0].name, items[0].description, items[0].location, items[0].isTakeable);
const paper = new Item(items[1].name, items[1].description, items[1].location, items[1].isTakeable);

let itemLookUp = {
  sign: sign,
  paper: paper
}
exports.Item = Item;
