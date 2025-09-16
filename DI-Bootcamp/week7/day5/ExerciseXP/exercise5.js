// 1. Retrieve the div and console.log it
const containerDiv = document.getElementById("container");
console.log(containerDiv);

// 2. Change the name “Pete” to “Richard”
const allLis = document.querySelectorAll("ul.list li");
allLis.forEach(li => {
    if (li.textContent === "Pete") {
        li.textContent = "Richard";
    }
});

// 3. Delete the second <li> of the second <ul>
const secondUl = document.querySelectorAll("ul.list")[1];
secondUl.removeChild(secondUl.children[1]); // removes "Sarah"

// 4. Change the first <li> of each <ul> to your name
const firstLis = document.querySelectorAll("ul.list li:first-child");
firstLis.forEach(li => li.textContent = "David"); // replace with your name

// 5. Add class student_list to both <ul>'s
const allUls = document.querySelectorAll("ul.list");
allUls.forEach(ul => ul.classList.add("student_list"));

// 6. Add classes university and attendance to the first <ul>
allUls[0].classList.add("university", "attendance");

// 7. Add light blue background and padding to the div
containerDiv.style.backgroundColor = "lightblue";
containerDiv.style.padding = "10px";

// 8. Hide <li> that contains “Dan”
allLis.forEach(li => {
    if (li.textContent === "Dan") {
        li.style.display = "none";
    }
});

// 9. Add a border to the <li> that contains “Richard”
allLis.forEach(li => {
    if (li.textContent === "Richard") {
        li.style.border = "2px solid black";
    }
});

// 10. Change the font size of the whole body
document.body.style.fontSize = "18px";

// 11. Bonus: alert if div background is light blue
if (containerDiv.style.backgroundColor === "lightblue") {
    // Extract users from div text
    const usersText = containerDiv.textContent.replace("Users: ", "");
    alert(`Hello ${usersText}`);
}
