const readline = require("readline");
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

async function prompt(question = "") {
  return ask(`${question}>_ `);
}
exports.prompt = prompt;

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
exports.ask = ask;
