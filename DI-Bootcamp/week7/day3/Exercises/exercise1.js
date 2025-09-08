const people = ["Greg", "Mary", "Devon", "James"];
console.log("Start:", people);

people.shift(); // removes the first element
console.log("After removing Greg:", people);

people[people.indexOf("James")] = "Jason";
console.log("After replacing James with Jason:", people);

people.push("David"); // replace with your actual name
console.log("After adding my name:", people);

console.log("Mary's index is:", people.indexOf("Mary"));

const copy = people.slice(1, -1); // slice from index 1 to last-1
console.log("Copy without Mary & my name:", copy);

console.log("Index of Foo:", people.indexOf("Foo")); // -1 because it's not in the array

const last = people[people.length - 1];
console.log("Last element:", last);

for (let person of people) {
  console.log(person);
}

for (let person of people) {
  console.log(person);
  if (person === "Devon") {
    break;
  }
}