class ItemDoesntExist extends Error {
  constructor(message) {
    super(message);
    this.name = "ItemDoesntExist";
  }
}

class PlayerDoesntHaveItem extends Error {
  constructor(message) {
    super(message);
    this.name = "PlayerDoesntHaveItem";
  }
}

class ItemIsUnusable extends Error {
  constructor(message) {
    super(message);
    this.name = "UseItemError";
  }
}

class ItemIsUnreadable extends Error {
  constructor(message) {
    super(message);
    this.name = "ItemIsUnreadable";
  }
}
module.exports = {ItemDoesntExist, PlayerDoesntHaveItem, ItemIsUnusable, ItemIsUnreadable};
