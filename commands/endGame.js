const {invalidArgs} = require("../errors/inputErrors");

function endGame(player, args) {
  try {
    validateEndGame(args);
    return (player.answer = "exit");
  } catch (error) {
    throw error;
  }
}

function validateEndGame(args) {
  if (args) {
    throw new invalidArgs("Incorrect command, type 'exit' to end game.");
  }
}
exports.endGame = endGame;
