const marioGame = {
  detail: "An amazing game!",
  characters: {
    mario: {
      description: "Small and jumpy. Likes princesses.",
      height: 10,
      weight: 3,
      speed: 12,
    },
    bowser: {
      description: "Big and green, Hates princesses.",
      height: 16,
      weight: 6,
      speed: 4,
    },
    princessPeach: {
      description: "Beautiful princess.",
      height: 12,
      weight: 2,
      speed: 2,
    },
  },
};

// 1. Convert JS object to JSON string
// Nested objects are also converted — all values become JSON-compatible strings/numbers/objects.
const jsonString = JSON.stringify(marioGame);
console.log("JSON string:");
console.log(jsonString);

// 2. Convert and pretty print (indent of 2 spaces)
const prettyJson = JSON.stringify(marioGame, null, 2);
console.log("\nPretty printed JSON:");
console.log(prettyJson);

// 3. Breakpoint hint: open DevTools in the browser, or use the debugger keyword below.
//    In Node.js you can run: node --inspect exercise3.js and use Chrome DevTools.
debugger; // add a breakpoint here to inspect jsonString and prettyJson
