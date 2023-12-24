const locationState = {
  room0: ["room1"], // outside
  room1: ["room0", "room2", "room4"], // church
  room2: ["room1", "room3"], // floor1
  room3: ["room2"], // floor2
  room4: ["room1", "room5"], // basement1
  room5: ["room4", "room6"], // basement2
  room6: ["room5"], // finnal room
};
exports.locationState = locationState;

// Future feature: should write a function to deal with these case sensitive room's names
const roomNameLookup = {
  room0: ["street", "outside"],
  room1: ["church"],
  room2: ["floor1", "floor one", "first floor", "grand door", "door", "Grand door", "granddoor", "floor 1", "Floor one"],
  room3: ["floor2", "floor two", "second floor", "floor 2", "Floor two"],
  room4: ["basement1", "basement 1", "basement one", "first basement", "Basement one"],
  room5: ["basement2", "basement 2", "basement two", "second basement", "Basement two", "passage", "hidden passage", "Hidden passage"],
  room6: ["basement3", "basement 3", "basement three", "altar", "Altar"],
};
exports.roomNameLookup = roomNameLookup;

// future feature: display item name in a more descriptive way
const itemNameLookUp = {
  sign: ["sign"],
  paper: ["piece of paper", "paper"],
  key: ["ornate key", "key"],
  amulet: ["amulet", "shadow amulet"],
};
exports.itemNameLookUp = itemNameLookUp;

const commandLookUp = {
  read: ["r", "read"],
  look: ["l", "look", "examine"],
  inventory: ["i", "inventory"],
  use: ["use", "u", "burn"],
  drop: ["d", "drop"],
  take: ["t", "take"],
  go: ["go", "g", "move", "open", "o", "enter"],
  endGame: ["exit"],
};
exports.commandLookUp = commandLookUp;
