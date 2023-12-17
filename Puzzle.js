class Puzzle {
    constructor(puzzleName, puzzleLocation, puzzleMessage, puzzleSolvedMessage ){
        this._puzzleName = puzzleName;
        this._puzzleLocation = puzzleLocation;
        this._puzzleMessage = puzzleMessage;
        this._puzzleSolvedMessage = puzzleSolvedMessage;
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
}
exports.Puzzle = Puzzle;