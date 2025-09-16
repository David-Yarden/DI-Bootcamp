// Retrieve h1 and console.log it
const h1 = document.querySelector("article h1");
console.log(h1);

// Remove last paragraph
const article = document.querySelector("article");
article.removeChild(article.lastElementChild);

// Event listener to change h2 background to red on click
const h2 = document.querySelector("article h2");
h2.addEventListener("click", () => {
    h2.style.backgroundColor = "red";
});

// Event listener to hide h3 on click
const h3 = document.querySelector("article h3");
h3.addEventListener("click", () => {
    h3.style.display = "none";
});

// Button to make all paragraphs bold
const btn = document.getElementById("boldBtn");
btn.addEventListener("click", () => {
    const paragraphs = document.querySelectorAll("article p");
    paragraphs.forEach(p => p.style.fontWeight = "bold");
});

// BONUS: Random font size on h1 hover
h1.addEventListener("mouseover", () => {
    const randomSize = Math.floor(Math.random() * 101); // 0-100px
    h1.style.fontSize = `${randomSize}px`;
});

// BONUS: Fade out second paragraph on hover
const secondP = document.querySelectorAll("article p")[1];
secondP.addEventListener("mouseover", () => {
    secondP.classList.add("fade");
});
secondP.addEventListener("mouseout", () => {
    secondP.classList.remove("fade");
});
