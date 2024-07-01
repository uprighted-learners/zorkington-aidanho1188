class invalidArgs extends Error {
  constructor(message) {
    super(message);
    this.name = "invalidArgument";
  }
}

module.exports = {invalidArgs};
