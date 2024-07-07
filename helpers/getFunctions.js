const {commandLookUp, locationLookUp} = require('./lookUps')

function validateCommandKey(command) {
  return Object.keys(commandLookUp).find((key) => commandLookUp[key].includes(command)) || false
}

function getObjectName(item, nameLookUp) {
  if (!item) return false

  return Object.keys(nameLookUp).find((key) => nameLookUp[key].includes(item))
}

function getCommand(input) {
  return input[0] ? input[0].toLowerCase() : ''
}

function getTarget(input) {
  if (input.length > 1) {
    return input.splice(1).join(' ').toLowerCase()
  } else {
    return ''
  }
}

function getCurrentLocation(player) {
  return locationLookUp[player.location]
}

exports.validateCommandKey = validateCommandKey
exports.getObjectName = getObjectName
exports.getCommand = getCommand
exports.getTarget = getTarget
exports.getCurrentLocation = getCurrentLocation
