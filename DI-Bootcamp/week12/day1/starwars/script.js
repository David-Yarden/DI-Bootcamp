const btn = document.getElementById("generateBtn");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const cardEl = document.getElementById("character");

const nameEl = document.getElementById("name");
const heightEl = document.getElementById("height");
const genderEl = document.getElementById("gender");
const birthEl = document.getElementById("birth_year");
const homeworldEl = document.getElementById("homeworld");

async function getCharacter() {
  const randomId = Math.floor(Math.random() * 83) + 1;
  const url = `https://www.swapi.tech/api/people/${randomId}`;

  // UI state: show loading
  loadingEl.classList.remove("hidden");
  errorEl.classList.add("hidden");
  cardEl.classList.add("hidden");

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Character fetch failed (${res.status})`);
    const data = await res.json();

    if (!data || !data.result || !data.result.properties) {
      throw new Error("Unexpected API response");
    }

    const char = data.result.properties;

    // Safe defaults
    const charName = char.name || "Unknown";
    const charHeight = char.height ? `${char.height} cm` : "Unknown";
    const charGender = char.gender || "Unknown";
    const charBirth = char.birth_year || "Unknown";
    let homeName = "Unknown";

    // Fetch homeworld if URL exists
    if (char.homeworld) {
      try {
        const hRes = await fetch(char.homeworld);
        if (hRes.ok) {
          const hData = await hRes.json();
          homeName = (hData && hData.result && hData.result.properties && hData.result.properties.name) || "Unknown";
        } // if homeworld fetch failed, keep "Unknown"
      } catch (hwErr) {
        // ignore, keep "Unknown"
        console.warn("Homeworld fetch error", hwErr);
      }
    }

    // Fill DOM
    nameEl.textContent = charName;
    heightEl.textContent = charHeight;
    genderEl.textContent = charGender;
    birthEl.textContent = charBirth;
    homeworldEl.textContent = homeName;

    // Show card
    cardEl.classList.remove("hidden");

  } catch (err) {
    console.error(err);
    errorEl.classList.remove("hidden");
  } finally {
    loadingEl.classList.add("hidden");
  }
}

btn.addEventListener("click", getCharacter);
