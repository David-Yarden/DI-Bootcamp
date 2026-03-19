// ── Challenge 1: makeAllCaps & sortWords ──────────────────────

function makeAllCaps(arr) {
  return new Promise((resolve, reject) => {
    const allStrings = arr.every(word => typeof word === "string");
    if (allStrings) {
      resolve(arr.map(word => word.toUpperCase()));
    } else {
      reject("Error: all items must be strings");
    }
  });
}

function sortWords(arr) {
  return new Promise((resolve, reject) => {
    if (arr.length > 4) {
      resolve(arr.sort());
    } else {
      reject(arr); // rejects with the uppercased array (shown in image)
    }
  });
}

// catch is executed — array contains a number
makeAllCaps([1, "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch(error => console.log(error));

// catch is executed — array length <= 4
makeAllCaps(["apple", "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch(error => console.log(error));

// resolves — all strings, length > 4
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result)) // ["APPLE","BANANA","KIWI","MELON","PEAR"]
  .catch(error => console.log(error));
