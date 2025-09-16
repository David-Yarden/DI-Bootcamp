const grid = document.querySelector(".grid");
const colorPicker = document.getElementById("colorPicker");

let mouseDown = false;
let currentColor = colorPicker.value;

// Update color when user picks a new one
colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
});

// Track mouse down and up for drawing
document.body.addEventListener("mousedown", () => mouseDown = true);
document.body.addEventListener("mouseup", () => mouseDown = false);

// Create 400 squares (20x20)
for (let i = 0; i < 400; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    // Draw when clicking or dragging
    square.addEventListener("mouseover", () => {
        if (mouseDown) square.style.backgroundColor = currentColor;
    });

    square.addEventListener("mousedown", () => {
        square.style.backgroundColor = currentColor;
    });

    grid.appendChild(square);
}
