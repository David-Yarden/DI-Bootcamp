// ── Starry background ─────────────────────────────────────────
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function drawStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 250; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 1.5;
    const colors = ["#fff", "#ffd6e0", "#d6e8ff", "#ffe8d6"];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fill();
  }
}

drawStars();
window.addEventListener("resize", drawStars);

// ── DOM elements ──────────────────────────────────────────────
const card = document.getElementById("card");
const findBtn = document.getElementById("find-btn");

// ── Show states ───────────────────────────────────────────────
function showLoading() {
  card.innerHTML = `
    <i class="fa-solid fa-circle-notch fa-spin loading-icon"></i>
    <p class="loading-text">Loading...</p>
  `;
}

function showError() {
  card.innerHTML = `<p class="error-text">Oh No! That person isnt available.</p>`;
}

function showCharacter(name, height, gender, birthYear, homeWorld) {
  card.innerHTML = `
    <p class="char-name">${name}</p>
    <div class="char-detail">
      <p>Height: ${height}</p>
      <p>Gender: ${gender}</p>
      <p>Birth Year: ${birthYear}</p>
      <p>Home World: ${homeWorld}</p>
    </div>
  `;
}

// ── Fetch homeworld name ───────────────────────────────────────
async function getHomeWorld(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("homeworld fetch failed");
  const data = await response.json();
  return data.result.properties.name;
}

// ── Fetch random character ────────────────────────────────────
async function getCharacter() {
  showLoading();
  findBtn.disabled = true;

  const randomId = Math.floor(Math.random() * 83) + 1;

  try {
    const response = await fetch(`https://www.swapi.tech/api/people/${randomId}/`);
    if (!response.ok) throw new Error("character fetch failed");

    const data = await response.json();
    const props = data.result.properties;

    const homeWorld = await getHomeWorld(props.homeworld);

    showCharacter(props.name, props.height, props.gender, props.birth_year, homeWorld);
  } catch (error) {
    showError();
  } finally {
    findBtn.disabled = false;
  }
}

// ── Button ────────────────────────────────────────────────────
findBtn.addEventListener("click", getCharacter);

// Load a character on page load
getCharacter();
