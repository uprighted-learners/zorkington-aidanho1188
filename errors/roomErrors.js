class RoomDoesntExistError extends Error {
  constructor(message) {
    super(message);
    this.name = "RoomDoesntExistError";
  }
}

class MoveRoomError extends Error {
  constructor(message) {
    super(message);
    this.name = "MoveRoomError";
  }
}

class NotUnlockedError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotUnlockedError";
  }
}
module.exports = {RoomDoesntExistError, MoveRoomError, NotUnlockedError};
