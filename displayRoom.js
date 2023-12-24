function displayRoom(room) {
  return console.log(`\n\n\n\nRoom name: ${room.name}   Available items: ${room.inventory}    Commands: go, i, look, read, open, burn, drop, use...`);
}
exports.displayRoom = displayRoom;
