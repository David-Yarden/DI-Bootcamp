let allBoldItems;

function getBoldItems() {
    const paragraph = document.getElementById("sentence");
    allBoldItems = paragraph.querySelectorAll("strong");
}
getBoldItems();

function highlight() {
    allBoldItems.forEach(item => item.style.color = "blue");
}

function returnItemsToDefault() {
    allBoldItems.forEach(item => item.style.color = "black");
}

const paragraph = document.getElementById("sentence");
paragraph.addEventListener("mouseover", highlight);
paragraph.addEventListener("mouseout", returnItemsToDefault);
