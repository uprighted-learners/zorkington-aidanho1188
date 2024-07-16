function displayRoom(room) {
  // TODO: return an array of strings is better than a single string
  let roomInventory = room.inventory.join(', ')
  return `Room name: ${room.name} \b Available items: ${roomInventory}`
}
exports.displayRoom = displayRoom
