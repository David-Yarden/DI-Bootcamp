
// const math = require('./math.js');


// console.log("5 * 3 =", math.multi(5, 3));
// console.log("10 / 2 =", math.divide(10, 2));
// console.log("4 + 7 =", math.plus(4, 7));
// console.log("9 - 6 =", math.minus(9, 6));

// main.js
const axios = require('axios');

async function fetchUsers() {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}

fetchUsers(); // call the async function
