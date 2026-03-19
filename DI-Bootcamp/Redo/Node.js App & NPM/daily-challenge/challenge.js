const { greet } = require("./greeting");
const { displayColorfulMessage } = require("./colorful-message");
const { readFileData } = require("./read-file");

console.log(greet("Alice"));
displayColorfulMessage();
readFileData();
