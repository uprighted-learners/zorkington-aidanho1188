// const fs = require("fs");
import Puzzle from '../classes/Puzzle'
import puzzles from '../data/puzzleList.js'
// const puzzles = JSON.parse(puzzleJsonData)

const puzzlesList = {...puzzles}

const lockpad = new Puzzle(...Object.values(puzzlesList[0]))
const grandDoor = new Puzzle(...Object.values(puzzlesList[1]))
const hiddenPassage = new Puzzle(...Object.values(puzzlesList[2]))
const oldAltar = new Puzzle(...Object.values(puzzlesList[3]))

export let puzzleLookup = {
  room1: lockpad,
  room2: grandDoor,
  room5: hiddenPassage,
  room6: oldAltar,
}
