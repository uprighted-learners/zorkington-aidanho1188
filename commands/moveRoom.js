const {locationState, locationLookUp, roomNameLookup} = require('../helpers/lookUps')
const {RoomDoesntExistError, MoveRoomError, NotUnlockedError} = require('../errors/roomErrors')
const {movePlayer} = require('../helpers/movePlayer')
const {getObjectName} = require('../helpers/getFunctions')
const {puzzleLookup} = require('../helpers/puzzlesLookup')

async function moveRoom(player, targetedRoom) {
  targetedRoom = getObjectName(targetedRoom, roomNameLookup)
  let currentRoom = player.location
  try {
    validateMove(currentRoom, targetedRoom)
    movePlayer(player, targetedRoom)
    return `You moved to ${targetedRoom}... 🚶‍♂️`
  } catch (error) {
    if (error instanceof NotUnlockedError) {
      let puzzle = puzzleLookup[targetedRoom]
      console.log(error.message)
      targetedRoom = getObjectName(targetedRoom, roomNameLookup)
      return `${puzzle.message}`
    } else {
      throw error
    }
  }
}

function validateMove(currentRoom, targetedRoom) {
  if (!checkRoomExists(targetedRoom)) {
    throw new RoomDoesntExistError('Room does not exist!')
  }
  if (!checkValidMove(currentRoom, targetedRoom)) {
    throw new MoveRoomError("You can't move to this room! 🚫")
  }
  if (!solvePuzzle(currentRoom, targetedRoom)) {
    throw new NotUnlockedError('Please solve the puzzle first!')
  }
}

function checkRoomExists(targetedRoom) {
  return locationLookUp.hasOwnProperty(targetedRoom)
}

function checkValidMove(currentRoom, targetedRoom) {
  return locationState[currentRoom].includes(targetedRoom)
}

function checkUnlocked(targetedRoom) {
  return locationLookUp[targetedRoom].isUnlocked
}

function solvePuzzle(currentRoom, targetedRoom) {
  return !(checkValidMove(currentRoom, targetedRoom) && !checkUnlocked(targetedRoom))
}

// legacy code, will need to refactor
// async function displayRoomPuzzle(targetedRoom) {
//   let puzzle = puzzleLookup[targetedRoom]
//   print(`${puzzle.message}`)
//   while (!puzzle.isSolved) {
//     let input = await prompt(puzzle.promptMessage)
//     if (input === puzzle.answer) {
//       setPuzzleIsSolved(puzzle, targetedRoom)
//       movePlayer(player, targetedRoom)
//       return true
//     } else if (input === 'back') {
//       return false
//     } else if (hasUseCommand(input)) {
//       let inputArr = input.trim().split(' ') // bad code, should write this in another function
//       let item = getTarget(inputArr)
//       let usuable = await use(player, item, targetedRoom)
//       if (usuable === true) {
//         return true
//       }
//     } else {
//       print(puzzle.wrongAnswer)
//     }
//   }
// }

// function hasUseCommand(input) {
//   let inputArr = input.trim().split(' ')
//   let command = getCommand(inputArr)
//   return validateCommandKey(command)
// }

exports.moveRoom = moveRoom
