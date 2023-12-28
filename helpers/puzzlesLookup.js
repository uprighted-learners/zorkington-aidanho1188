const fs = require("fs");
const {Puzzle} = require("../classes/Puzzle");
const puzzleJsonData = fs.readFileSync("./data/puzzleList.json");
const puzzles = JSON.parse(puzzleJsonData);

const puzzlesList = {...puzzles};

const lockpad = new Puzzle(...Object.values(puzzlesList[0]));
const grandDoor = new Puzzle(...Object.values(puzzlesList[1]));
const hiddenPassage = new Puzzle(...Object.values(puzzlesList[2]));
const oldAltar = new Puzzle(...Object.values(puzzlesList[3]));

let puzzleLookup = {
  room1: lockpad,
  room2: grandDoor,
  room5: hiddenPassage,
  room6: oldAltar,
};
exports.puzzleLookup = puzzleLookup;
