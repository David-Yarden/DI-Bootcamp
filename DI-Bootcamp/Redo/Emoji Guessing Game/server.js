const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const emojis = [
  { emoji: "😀", name: "Smile" },
  { emoji: "🐶", name: "Dog" },
  { emoji: "🌮", name: "Taco" },
  { emoji: "🚀", name: "Rocket" },
  { emoji: "🎸", name: "Guitar" },
  { emoji: "🌈", name: "Rainbow" },
  { emoji: "🦁", name: "Lion" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "⚽", name: "Soccer Ball" },
  { emoji: "🎃", name: "Jack-o-Lantern" },
  { emoji: "🌵", name: "Cactus" },
  { emoji: "🦋", name: "Butterfly" },
  { emoji: "🍦", name: "Ice Cream" },
  { emoji: "🎈", name: "Balloon" },
  { emoji: "🐬", name: "Dolphin" },
  { emoji: "🌸", name: "Cherry Blossom" },
  { emoji: "🎯", name: "Bullseye" },
  { emoji: "🦄", name: "Unicorn" },
  { emoji: "🍓", name: "Strawberry" },
  { emoji: "🏆", name: "Trophy" },
];

const leaderboard = [];

function getRandomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function getOptions(correct) {
  const others = emojis
    .filter(e => e.name !== correct.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(e => e.name);
  const options = [...others, correct.name].sort(() => Math.random() - 0.5);
  return options;
}

// GET /api/question — return a random emoji + options
app.get("/api/question", (req, res) => {
  const correct = getRandomEmoji();
  const options = getOptions(correct);
  res.json({ emoji: correct.emoji, answer: correct.name, options });
});

// POST /api/guess — check the guess
app.post("/api/guess", (req, res) => {
  const { guess, answer, score, player } = req.body;
  const correct = guess === answer;
  const newScore = correct ? (score || 0) + 1 : (score || 0);

  if (player) {
    const existing = leaderboard.find(e => e.player === player);
    if (existing) {
      existing.score = Math.max(existing.score, newScore);
    } else {
      leaderboard.push({ player, score: newScore });
    }
    leaderboard.sort((a, b) => b.score - a.score);
  }

  res.json({ correct, score: newScore });
});

// GET /api/leaderboard
app.get("/api/leaderboard", (req, res) => {
  res.json(leaderboard.slice(0, 10));
});

app.listen(PORT, () => console.log(`Emoji Guessing Game running on http://localhost:${PORT}`));
