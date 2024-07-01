const {locationLookUp} = require('./lookUps')
const {print} = require('./print')

function setPuzzleIsSolved(puzzle, targetedRoom) {
  locationLookUp[targetedRoom].isUnlocked = true
  puzzle.isSolved = true
  return `${puzzle.solvedMessage}`
}
exports.setPuzzleIsSolved = setPuzzleIsSolved
