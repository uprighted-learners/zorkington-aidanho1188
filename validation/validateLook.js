const {RoomDoesntExistError} = require('../errors/roomErrors')
const {invalidArgs} = require('../errors/inputErrors')

function validateLook(room, args) {
  if (!roomExists(room)) {
    throw new RoomDoesntExistError('Room does not exist.')
  }
  if (args) {
    throw new invalidArgs('I can\'t look at this, please try with just "look".')
  }
}

function roomExists(room) {
  return room.description1 !== null && room.description2 !== null
}

module.exports = {validateLook}
