const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

function toJs() {
  return new Promise((resolve, reject) => {
    const morseJS = JSON.parse(morse);
    if (Object.keys(morseJS).length === 0) {
      reject("Error: morse object is empty");
    } else {
      resolve(morseJS);
    }
  });
}

function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const input = document.getElementById("word-input").value.toLowerCase();
    const chars = input.split("");
    const translation = [];

    for (const char of chars) {
      if (char === " ") continue; // skip spaces
      if (!morseJS[char]) {
        reject(`Error: character "${char}" does not exist in morse code`);
        return;
      }
      translation.push(morseJS[char]);
    }

    resolve(translation);
  });
}

function joinWords(morseTranslation) {
  const output = document.getElementById("output");
  const error = document.getElementById("error");
  error.textContent = "";
  output.textContent = morseTranslation.join("\n");
}

document.getElementById("translate-btn").addEventListener("click", () => {
  const output = document.getElementById("output");
  const error = document.getElementById("error");
  output.textContent = "";
  error.textContent = "";

  toJs()
    .then(morseJS => toMorse(morseJS))
    .then(translation => joinWords(translation))
    .catch(err => {
      error.textContent = err;
    });
});
