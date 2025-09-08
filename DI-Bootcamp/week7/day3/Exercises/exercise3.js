let num = Number(prompt("Enter a number:"));
console.log("You entered:", num, "and its type is:", typeof num);

while (num < 10) {
  num = Number(prompt("Number is too small! Enter a new number:"));
}

console.log("Great! Your number is", num);
