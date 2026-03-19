const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

const form = document.getElementById("gif-form");
const categoryInput = document.getElementById("category-input");
const gifContainer = document.getElementById("gif-container");
const deleteAllBtn = document.getElementById("delete-all-btn");

async function fetchRandomGif(category) {
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(category)}&rating=g`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const json = await response.json();
  return json.data;
}

function appendGif(gifData) {
  const gifUrl = gifData.images.fixed_height.url;

  const card = document.createElement("div");
  card.classList.add("gif-card");

  const img = document.createElement("img");
  img.src = gifUrl;
  img.alt = gifData.title || "gif";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "DELETE";
  deleteBtn.addEventListener("click", () => card.remove());

  card.appendChild(img);
  card.appendChild(deleteBtn);
  gifContainer.appendChild(card);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const category = categoryInput.value.trim();
  if (!category) return;

  try {
    const gifData = await fetchRandomGif(category);
    if (!gifData || !gifData.images) {
      throw new Error("No gif found for this category.");
    }
    appendGif(gifData);
    categoryInput.value = "";
  } catch (error) {
    console.error("Error fetching gif:", error);
  }
});

deleteAllBtn.addEventListener("click", () => {
  gifContainer.innerHTML = "";
});
