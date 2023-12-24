const {commandLookUp} = require("./lookUps");

function validateCommandKey(command) {
  return Object.keys(commandLookUp).find((key) => commandLookUp[key].includes(command)) || false;
}

function getObjectName(item, nameLookUp) {
  return Object.keys(nameLookUp).find((key) => nameLookUp[key].includes(item));
}

function getCommand(input) {
  return input[0].toLowerCase();
}

function getTarget(input) {
  if (input.length > 1) {
    return input.splice(1).join(" ");
  } else {
    return null;
  }
}
exports.validateCommandKey = validateCommandKey;
exports.getObjectName = getObjectName;
exports.getCommand = getCommand;
exports.getTarget = getTarget;
