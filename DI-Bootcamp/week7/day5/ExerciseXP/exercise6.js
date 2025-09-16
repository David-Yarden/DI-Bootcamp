// 1. Change the div id from navBar to socialNetworkNavigation
const navDiv = document.getElementById("navBar");
navDiv.setAttribute("id", "socialNetworkNavigation");

// 2. Add a new <li> with text "Logout" to the <ul>
const ul = navDiv.querySelector("ul");       // select the <ul>
const newLi = document.createElement("li");  // create new <li>
const newText = document.createTextNode("Logout"); // create text node
newLi.appendChild(newText);                  // append text to <li>
ul.appendChild(newLi);                        // append <li> to <ul>

// 3. Retrieve first and last <li> elements and display their text
const firstLi = ul.firstElementChild;
const lastLi = ul.lastElementChild;

console.log("First link text:", firstLi.textContent); // Profile
console.log("Last link text:", lastLi.textContent);   // Logout
