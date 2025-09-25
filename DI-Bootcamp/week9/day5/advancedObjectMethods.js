// Exercise

// Use the methods above to :

//     Count how many keys and values are in the object below
//     Display : "The x# key is : --- The x# value is : ---".
let myObj = {
    name : "John",
    lastName : "Doe",
    age : 25,
    friends : ["Mark", "Lucie", "Ana"]
}
const numberOfKeys = Object.keys(myObj).length;
console.log(`The number of keys is: ${numberOfKeys}`
);

Object.entries(myObj).forEach(([key, value]) => console.log(`The key is: ${key} - The value is: ${value}`));

