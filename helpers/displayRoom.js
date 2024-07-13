function displayRoom(room) {
  // TODO: return an array of strings is better than a single string
  return `Room name: ${room.name} \b Available items: ${room.inventory}`
}
exports.displayRoom = displayRoom
