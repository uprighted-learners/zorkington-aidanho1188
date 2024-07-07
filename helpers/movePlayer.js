const {printOutput} = require('./printOutput')
const {roomNameLookup} = require('./lookUps')
const {getObjectName} = require('./getFunctions')

function movePlayer(player, targetedRoom) {
  player.location = targetedRoom
  let roomName = roomNameLookup[targetedRoom][0]
  return printOutput(`You moved to ${roomName}... 🚶‍♂️`)
}
exports.movePlayer = movePlayer
