const form = document.getElementById("MyForm");
const radiusInput = document.getElementById("radius");
const volumeInput = document.getElementById("volume");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const radius = parseFloat(radiusInput.value);
    if (!isNaN(radius) && radius > 0) {
        const volume = (4/3) * Math.PI * Math.pow(radius, 3);
        volumeInput.value = volume.toFixed(2);
    } else {
        alert("Please enter a valid number for radius.");
        volumeInput.value = "";
    }
});
