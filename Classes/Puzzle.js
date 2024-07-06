export default class Puzzle {
  constructor(name, location, message, promptMessage, solvedMessage, answer, wrongAnswer, isSolved) {
    this._name = name
    this._location = location
    this._message = message
    this._promptMessage = promptMessage
    this._solvedMessage = solvedMessage
    this._answer = answer
    this._wrongAnswer = wrongAnswer
    this._isSolved = isSolved
  }

  get name() {
    return this._name
  }

  get location() {
    return this._location
  }

  get message() {
    return this._message
  }

  get promptMessage() {
    return this._promptMessage
  }

  get solvedMessage() {
    return this._solvedMessage
  }

  get answer() {
    return this._answer
  }

  get wrongAnswer() {
    return this._wrongAnswer
  }

  get isSolved() {
    return this._isSolved
  }

  set isSolved(value) {
    this._isSolved = value
  }
}
