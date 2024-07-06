const {printOutput} = require('./printOutput')
const {roomNameLookup} = require('./lookUps')

function movePlayer(player, targetedRoom) {
  player.location = targetedRoom
  let roomName = roomNameLookup[targetedRoom][0]
  return printOutput(`You moved to ${roomName}... 🚶‍♂️`)
}
exports.movePlayer = movePlayer
