const fs = require("fs");
const roomsJsonData = fs.readFileSync("./data/roomsList.json");
const rooms = JSON.parse(roomsJsonData);
class Location {
  constructor(name, description, inventory, connection, isUnlocked) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.connection = connection;
    this.isUnlocked = isUnlocked;
  }

  getDescription = () => { return this.description; };
  getAvailableItems = () => { return this.inventory; };
}


const startRoom = new Location(rooms[0].name, rooms[0].description, rooms[0].inventory);
const room1 = new Location(rooms[1].name, rooms[1].description, rooms[1].inventory);
const room2 = new Location(rooms[2].name, rooms[2].description, rooms[2].inventory);
const room3 = new Location(rooms[3].name, rooms[3].description, rooms[3].inventory);
const room4 = new Location(rooms[4].name, rooms[4].description, rooms[4].inventory);

exports.Location = Location;
