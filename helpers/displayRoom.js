function displayRoom(room) {
  return `\n\n\n\nRoom name: ${room.name}   Available items: ${room.inventory}    Commands: go, i, lore, read, open, burn, drop, use...`
}
exports.displayRoom = displayRoom
