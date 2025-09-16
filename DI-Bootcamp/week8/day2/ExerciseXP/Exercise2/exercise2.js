const form = document.getElementById("myForm");
console.log(form);

const fnameInput = document.getElementById("fname");
const lnameInput = document.getElementById("lname");
console.log(fnameInput, lnameInput);

const fnameByName = document.getElementsByName("firstname")[0];
const lnameByName = document.getElementsByName("lastname")[0];
console.log(fnameByName, lnameByName);

form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent page reload

    const fname = fnameInput.value.trim();
    const lname = lnameInput.value.trim();

    if (fname && lname) {
        const ul = document.querySelector(".usersAnswer");

        const liFname = document.createElement("li");
        liFname.textContent = fname;
        ul.appendChild(liFname);

        const liLname = document.createElement("li");
        liLname.textContent = lname;
        ul.appendChild(liLname);

        form.reset();
    }
});
