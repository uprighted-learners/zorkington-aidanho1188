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

class UseItemError extends Error {
  constructor(message) {
    super(message);
    this.name = "UseItemError";
  }
}
module.exports = {UseItemError, PlayerDoesntHaveItem, ItemDoesntExist};
