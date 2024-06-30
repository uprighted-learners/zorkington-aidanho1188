// const fs = require("fs");
const {Item} = require('../classes/Item')
import items from '../data/itemsList.js'
// const items = JSON.parse(itemsJsonData)

let itemsList = {...items}

const sign = new Item(...Object.values(itemsList[0]))
const paper = new Item(...Object.values(itemsList[1]))
const key = new Item(...Object.values(itemsList[2]))
const amulet = new Item(...Object.values(itemsList[3]))

export let itemLookUp = {
  sign: sign,
  paper: paper,
  key: key,
  amulet: amulet,
}

// exports.itemLookUp = itemLookUp
