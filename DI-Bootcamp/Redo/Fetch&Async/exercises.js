// ── Exercise 1: Giphy API – fetch hilarious gifs ─────────────
const giphyUrl = "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(giphyUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.log("Error:", error));


// ── Exercise 2: Giphy API – 10 gifs about "sun", offset 2 ────
// limit=10 → retrieve 10 gifs
// offset=2 → starting position of results is 2
const sunUrl = "https://api.giphy.com/v1/gifs/search?q=sun&rating=g&limit=10&offset=2&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(sunUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.log("Error:", error));


// ── Exercise 3: Async/Await – Star Wars starship ─────────────
async function getStarship() {
  try {
    const response = await fetch("https://www.swapi.tech/api/starships/9/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const objectStarWars = await response.json();
    console.log(objectStarWars.result);
  } catch (error) {
    console.log("Error:", error);
  }
}

getStarship();


// ── Exercise 4: Analyze ───────────────────────────────────────
// Output:
// 1. "calling"  — logged immediately when asyncCall() is invoked
// 2. (2 second pause while the promise resolves)
// 3. "resolved" — logged after the await resolves

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  let result = await resolveAfter2Seconds();
  console.log(result);
}

asyncCall();
