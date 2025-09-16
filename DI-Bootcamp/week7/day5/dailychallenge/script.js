// 1. Create an array of planets as objects (name, color, number of moons)
const planets = [
    { name: "Mercury", color: "#a9a9a9", moons: 0 },
    { name: "Venus", color: "#f5deb3", moons: 0 },
    { name: "Earth", color: "#1e90ff", moons: 1 },
    { name: "Mars", color: "#ff4500", moons: 2 },
    { name: "Jupiter", color: "#f4a460", moons: 79 },
    { name: "Saturn", color: "#daa520", moons: 82 },
    { name: "Uranus", color: "#66cdaa", moons: 27 },
    { name: "Neptune", color: "#4169e1", moons: 14 }
];

// 2. Select the section where planets will be appended
const section = document.querySelector(".listPlanets");

// 3. Loop through planets and create divs
planets.forEach(planet => {
    // Create planet div
    const planetDiv = document.createElement("div");
    planetDiv.classList.add("planet");
    planetDiv.style.backgroundColor = planet.color;
    planetDiv.textContent = planet.name;

    // Bonus: create moons
    for (let i = 0; i < planet.moons; i++) {
        const moonDiv = document.createElement("div");
        moonDiv.classList.add("moon");

        // Position moons randomly around the planet
        const angle = (360 / planet.moons) * i;
        const radius = 70; // distance from planet
        const rad = angle * (Math.PI / 180);

        moonDiv.style.left = `${50 + radius * Math.cos(rad)}px`;
        moonDiv.style.top = `${50 + radius * Math.sin(rad)}px`;

        planetDiv.appendChild(moonDiv);
    }

    // Append planet div to section
    section.appendChild(planetDiv);
});
