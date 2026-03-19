let playerName = "";
let score = 0;
let currentAnswer = "";

const setupDiv = document.getElementById("setup");
const gameDiv = document.getElementById("game");
const startBtn = document.getElementById("start-btn");
const playerNameInput = document.getElementById("player-name");
const displayName = document.getElementById("display-name");
const scoreEl = document.getElementById("score");
const emojiDisplay = document.getElementById("emoji-display");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const guessForm = document.getElementById("guess-form");
const nextBtn = document.getElementById("next-btn");
const leaderboardList = document.getElementById("leaderboard-list");
const refreshLb = document.getElementById("refresh-lb");

startBtn.addEventListener("click", () => {
  playerName = playerNameInput.value.trim() || "Player";
  displayName.textContent = playerName;
  setupDiv.classList.add("hidden");
  gameDiv.classList.remove("hidden");
  loadQuestion();
  loadLeaderboard();
});

async function loadQuestion() {
  feedback.textContent = "";
  feedback.className = "";
  nextBtn.classList.add("hidden");
  guessForm.querySelector("button[type='submit']").classList.remove("hidden");

  const res = await fetch("/api/question");
  const data = await res.json();
  currentAnswer = data.answer;

  emojiDisplay.textContent = data.emoji;
  optionsDiv.innerHTML = data.options.map(opt => `
    <label>
      <input type="radio" name="guess" value="${opt}" />
      ${opt}
    </label>
  `).join("");
}

guessForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const selected = document.querySelector('input[name="guess"]:checked');
  if (!selected) return;

  const res = await fetch("/api/guess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ guess: selected.value, answer: currentAnswer, score, player: playerName }),
  });

  const data = await res.json();
  score = data.score;
  scoreEl.textContent = score;

  feedback.textContent = data.correct ? "✅ Correct!" : `❌ Wrong! It was "${currentAnswer}"`;
  feedback.className = data.correct ? "correct" : "wrong";

  guessForm.querySelector("button[type='submit']").classList.add("hidden");
  nextBtn.classList.remove("hidden");
  loadLeaderboard();
});

nextBtn.addEventListener("click", loadQuestion);

async function loadLeaderboard() {
  const res = await fetch("/api/leaderboard");
  const data = await res.json();
  leaderboardList.innerHTML = data.length
    ? data.map(e => `<li>${e.player} — ${e.score} pts</li>`).join("")
    : "<li>No scores yet</li>";
}

refreshLb.addEventListener("click", loadLeaderboard);
