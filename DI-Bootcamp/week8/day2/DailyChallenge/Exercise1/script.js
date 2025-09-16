setTimeout(function() {
    alert("Hello World");
}, 2000);

setTimeout(function() {
    const container = document.getElementById("container");
    const p = document.createElement("p");
    p.textContent = "Hello World";
    container.appendChild(p);
}, 2000);

const container = document.getElementById("container");
const clearBtn = document.getElementById("clear");

let intervalId = setInterval(function() {
    const p = document.createElement("p");
    p.textContent = "Hello World";
    container.appendChild(p);

    // Stop after 5 paragraphs
    if (container.children.length >= 5) {
        clearInterval(intervalId);
    }
}, 2000);

// Stop when button is clicked
clearBtn.addEventListener("click", function() {
    clearInterval(intervalId);
});
