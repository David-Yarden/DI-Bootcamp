// Step 1: Create a user object
let user = {
  username: "David",
  password: "12345"
};

// Step 2: Put the user object inside an array
let database = [user];

// Step 3: Create a newsfeed array with 3 objects
let newsfeed = [
  {
    username: "Alice",
    timeline: "Just finished learning JavaScript!"
  },
  {
    username: "Bob",
    timeline: "Enjoying a coffee and coding."
  },
  {
    username: "Charlie",
    timeline: "Excited to start a new project."
  }
];

// Log arrays to the console
console.log("Database:", database);
console.log("Newsfeed:", newsfeed);

// Step 4: Display the newsfeed on the webpage
let newsfeedDiv = document.getElementById("newsfeed");

// Loop through the newsfeed array
newsfeed.forEach(function(post) {
  // Create a new paragraph for each post
  let postElement = document.createElement("p");
  postElement.textContent = post.username + ": " + post.timeline;
  
  // Add it to the div
  newsfeedDiv.appendChild(postElement);
});
