const {getCurrentLocation} = require('../helpers/getFunctions')
const {displayRoom} = require('../helpers/displayRoom')
const {printOutput} = require('../helpers/printOutput')

async function look(player, args) {
  try {
    const room = getCurrentLocation(player)
    printOutput(displayRoom(room))
    printOutput('<br>')
    validateLook(room, args)
    return `${room.description1} ${room.description2}`
    // return true
  } catch (error) {
    throw error
  }
}
exports.look = look
