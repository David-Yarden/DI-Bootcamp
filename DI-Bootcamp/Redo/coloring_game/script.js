const COLORS = [
  "#000000", "#ffffff", "#e74c3c", "#e67e22", "#f1c40f",
  "#2ecc71", "#1abc9c", "#3498db", "#9b59b6", "#e91e63",
  "#ff5722", "#795548", "#607d8b", "#9e9e9e", "#cddc39",
  "#00bcd4", "#673ab7", "#ff9800", "#4caf50", "#2196f3",
];

const GRID_COLS = 30;
const GRID_ROWS = 20;

let selectedColor = COLORS[0];
let isDrawing = false;

// ── Build palette ──────────────────────────────────────────
const palette = document.getElementById("palette");

COLORS.forEach((color, index) => {
  const swatch = document.createElement("div");
  swatch.classList.add("color-swatch");
  swatch.style.background = color;
  if (index === 0) swatch.classList.add("active");

  swatch.addEventListener("click", () => {
    document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("active"));
    swatch.classList.add("active");
    selectedColor = color;
    document.getElementById("selected-preview").style.background = color;
  });

  palette.appendChild(swatch);
});

// set initial preview
document.getElementById("selected-preview").style.background = selectedColor;

// ── Build drawing grid ─────────────────────────────────────
const grid = document.getElementById("grid");

for (let i = 0; i < GRID_ROWS * GRID_COLS; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("mousedown", () => {
    isDrawing = true;
    cell.style.background = selectedColor;
  });

  cell.addEventListener("mouseover", () => {
    if (isDrawing) {
      cell.style.background = selectedColor;
    }
  });

  grid.appendChild(cell);
}

// stop drawing when mouse is released anywhere
document.addEventListener("mouseup", () => {
  isDrawing = false;
});

// ── Clear button ───────────────────────────────────────────
document.getElementById("clear-btn").addEventListener("click", () => {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.style.background = "#fff";
  });
});
