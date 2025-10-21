// app.js

// Import lodash and the custom math module
const _ = require('lodash');
const math = require('./math');

// Use the math module
const sum = math.add(10, 5);
const product = math.multiply(10, 5);

// Use lodash to work with arrays or numbers
const numbers = [10, 5, 20, 15];
const maxNumber = _.max(numbers);
const minNumber = _.min(numbers);
const avg = _.mean(numbers);

console.log("🧮 Custom Math Module Results:");
console.log(`Sum: ${sum}`);
console.log(`Product: ${product}`);

console.log("\n⚙️ Lodash Utility Results:");
console.log(`Numbers: ${numbers}`);
console.log(`Max: ${maxNumber}`);
console.log(`Min: ${minNumber}`);
console.log(`Average: ${avg}`);
