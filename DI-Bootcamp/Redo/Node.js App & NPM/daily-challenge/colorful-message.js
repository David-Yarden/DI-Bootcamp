const chalk = require("chalk");

function displayColorfulMessage() {
  console.log(chalk.blue.bold("Welcome to the Node.js Daily Challenge!"));
  console.log(chalk.green("Task 2 complete: NPM module chalk is working."));
  console.log(chalk.red("Red alert: Node.js is awesome!"));
}

module.exports = { displayColorfulMessage };
