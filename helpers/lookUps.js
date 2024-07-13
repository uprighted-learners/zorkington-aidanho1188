export const locationState = {
  room0: ['room1'], // outside
  room1: ['room0', 'room2', 'room4'], // church
  room2: ['room1', 'room3'], // floor1
  room3: ['room2'], // floor2
  room4: ['room1', 'room5'], // basement1
  room5: ['room4', 'room6'], // basement2
  room6: ['room5'], // finnal room
}
// exports.locationState = locationState

// Future feature: should write a function to deal with these case sensitive room's names
export const roomNameLookup = {
  room0: ['street', 'outside'],
  room1: ['church'],
  room2: ['floor1', 'floor one', 'first floor', 'grand door', 'door', 'Grand door', 'granddoor', 'floor 1', 'Floor one'],
  room3: ['floor2', 'floor two', 'second floor', 'floor 2', 'Floor two'],
  room4: ['basement1', 'basement 1', 'basement one', 'first basement', 'Basement one'],
  room5: ['basement2', 'basement 2', 'basement two', 'second basement', 'Basement two', 'passage', 'hidden passage', 'Hidden passage'],
  room6: ['basement3', 'basement 3', 'basement three', 'altar', 'Altar'],
}
// exports.roomNameLookup = roomNameLookup

// future feature: display item name in a more descriptive way
export const itemNameLookUp = {
  sign: ['sign'],
  paper: ['paper', 'piece of paper'],
  key: ['key', 'ornate key'],
  amulet: ['amulet', 'shadow amulet'],
}
// exports.itemNameLookUp = itemNameLookUp

export const commandLookUp = {
  read: ['r', 'read', 'inspect'],
  look: ['l', 'lore', 'look', 'examine'],
  inventory: ['i', 'inventory'],
  use: ['use', 'u', 'burn'],
  drop: ['d', 'drop'],
  take: ['t', 'take'],
  go: ['go', 'g', 'move', 'open', 'o', 'enter'],
  // endGame: ['exit'],
}
// exports.commandLookUp = commandLookUp

// Export the result of the initialize function
import Location from '../classes/Location.js'
import rooms from '../data/roomsList.js'

// const rooms = JSON.parse(roomsJsonData)
let roomsList = {...rooms}

function initialize() {
  let locationLookUp = {}
  for (let i = 0; i < rooms.length; i++) {
    let key = 'room' + i // Define key without export
    locationLookUp[key] = new Location(...Object.values(roomsList[i]))
  }
  return locationLookUp
}

// Export the result of the initialize function
export const locationLookUp = initialize()
