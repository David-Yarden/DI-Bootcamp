// math.js

// Simple custom math module

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// Export both functions using CommonJS
module.exports = { add, multiply };
