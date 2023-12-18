class Puzzle {
    // puzzles[0].name, puzzles[0].location, puzzles[0].puzzleMessage, puzzles[0].puzzleSolved, puzzles[0].puzzleAnswer, puzzles[0].puzzleWrongAnswer, puzzles[0].puzzleIsSolved);
    constructor(puzzleName, puzzleLocation, puzzleMessage, puzzleSolvedMessage, puzzleAnswer, puzzleWrongAnswer , puzzleIsSolved){
        this._puzzleName = puzzleName;
        this._puzzleLocation = puzzleLocation;
        this._puzzleMessage = puzzleMessage;
        this._puzzleSolvedMessage = puzzleSolvedMessage;
        this._puzzleAnswer = puzzleAnswer;
        this._puzzleWrongAnswer = puzzleWrongAnswer;
        this._puzzleIsSolved = false;
    }

    get puzzleName(){
        return this._puzzleName;
    }

    get puzzleLocation(){
        return this._puzzleLocation;
    }

    get puzzleMessage(){
        return this._puzzleMessage;
    }
        
    get puzzleSolvedMessage(){
        return this._puzzleSolvedMessage;
    }

    get puzzleAnswer(){
        return this._puzzleAnswer;
    }

    get puzzleWrongAnswer(){
        return this._puzzleWrongAnswer;
    }

    get isSolved(){
        return this._isSolved;
    }
}
exports.Puzzle = Puzzle;