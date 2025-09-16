const form = document.getElementById("libform");
const storySpan = document.getElementById("story");
const shuffleBtn = document.getElementById("shuffle-button");

// Array of story templates
const stories = [
    (noun, adjective, person, verb, place) => 
        `${person} took a ${adjective} ${noun} and decided to ${verb} it at ${place}.`,
    
    (noun, adjective, person, verb, place) =>
        `Once upon a time, ${person} found a ${adjective} ${noun} while trying to ${verb} in ${place}.`,
    
    (noun, adjective, person, verb, place) =>
        `${person} couldn't believe their eyes when a ${adjective} ${noun} started to ${verb} in ${place}!`
];

let lastInputs = null; // to store the latest input values

// Function to generate a story
function generateStory(noun, adjective, person, verb, place) {
    // Pick a random story template
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    return randomStory(noun, adjective, person, verb, place);
}

// Handle form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    const noun = document.getElementById("noun").value.trim();
    const adjective = document.getElementById("adjective").value.trim();
    const person = document.getElementById("person").value.trim();
    const verb = document.getElementById("verb").value.trim();
    const place = document.getElementById("place").value.trim();

    // Validate inputs
    if (!noun || !adjective || !person || !verb || !place) {
        alert("Please fill in all the fields!");
        return;
    }

    lastInputs = { noun, adjective, person, verb, place }; // save inputs for shuffle

    // Generate story
    storySpan.textContent = generateStory(noun, adjective, person, verb, place);
});

// Handle shuffle button click
shuffleBtn.addEventListener("click", function() {
    if (!lastInputs) return; // nothing to shuffle yet
    const { noun, adjective, person, verb, place } = lastInputs;
    storySpan.textContent = generateStory(noun, adjective, person, verb, place);
});
