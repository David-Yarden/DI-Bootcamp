// Self-invoking function to welcome the user
(function(userName, profilePicUrl){
    const navbar = document.getElementById("navbar");

    // Create a container div for user info
    const userDiv = document.createElement("div");
    userDiv.style.display = "flex";
    userDiv.style.alignItems = "center";
    userDiv.style.gap = "10px";

    // Create a text node with welcome message
    const welcomeText = document.createElement("span");
    welcomeText.textContent = `Welcome, ${userName}!`;

    // Create profile picture image element
    const profileImg = document.createElement("img");
    profileImg.src = profilePicUrl;
    profileImg.alt = `${userName}'s profile picture`;

    // Append text and image to container div
    userDiv.appendChild(profileImg);
    userDiv.appendChild(welcomeText);

    // Append container div to navbar
    navbar.appendChild(userDiv);

// Arguments: user name and profile picture URL
})("John", "https://via.placeholder.com/40");
