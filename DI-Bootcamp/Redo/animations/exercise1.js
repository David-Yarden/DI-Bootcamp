const container = document.getElementById("container");
const clearBtn = document.getElementById("clear");

// Part I: alert after 2 seconds
setTimeout(() => {
  alert("Hello World");
}, 2000);

// Part II: add a paragraph after 2 seconds
setTimeout(() => {
  const p = document.createElement("p");
  p.textContent = "Hello World";
  container.appendChild(p);
}, 2000);

// Part III: add a paragraph every 2 seconds, stop at 5 or on button click
const interval = setInterval(() => {
  const p = document.createElement("p");
  p.textContent = "Hello World";
  container.appendChild(p);

  if (container.querySelectorAll("p").length >= 5) {
    clearInterval(interval);
  }
}, 2000);

clearBtn.addEventListener("click", () => {
  clearInterval(interval);
});
