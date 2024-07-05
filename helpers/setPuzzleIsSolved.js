const {locationLookUp} = require('./lookUps')
const {printOutput} = require('../helpers/printOutput')

function setPuzzleIsSolved(puzzle, targetedRoom) {
  locationLookUp[targetedRoom].isUnlocked = true
  puzzle.isSolved = true
  return printOutput(`${puzzle.solvedMessage}`)
}

exports.setPuzzleIsSolved = setPuzzleIsSolved
