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

class EmptyInventory extends Error {
  constructor(message) {
    super(message);
    this.name = "EmptyInventory";
  }
}

class ItemIsNotPresent extends Error {
  constructor(message) {
    super(message);
    this.name = "ItemIsNotPresent";
  }
}

class ItemIsNotTabkeable extends Error {
  constructor(message) {
    super(message);
    this.name = "ItemIsNotTabkeable";
  }
}
module.exports = {ItemDoesntExist, PlayerDoesntHaveItem, ItemIsUnusable, ItemIsUnreadable, EmptyInventory, ItemIsNotPresent, ItemIsNotTabkeable};
