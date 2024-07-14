class NoRoomSelected extends Error {
  constructor(message) {
    super(message)
    this.name = 'NoRoomSelected'
  }
}

class RoomDoesntExistError extends Error {
  constructor(message) {
    super(message)
    this.name = 'RoomDoesntExistError'
  }
}

class MoveRoomError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MoveRoomError'
  }
}

class NotUnlockedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotUnlockedError'
  }
}

class InvalidLocation extends Error {
  constructor(message) {
    super(message)
    this.name = 'InvalidLocation'
  }
}

module.exports = {NoRoomSelected, RoomDoesntExistError, MoveRoomError, NotUnlockedError, InvalidLocation}
