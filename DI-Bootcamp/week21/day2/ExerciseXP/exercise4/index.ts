// Exercise 4: Control Flow with if...else
function checkNumber(num: number): string {
  if (num > 0) {
    return "positive";
  } else if (num < 0) {
    return "negative";
  } else {
    return "zero";
  }
}

console.log(checkNumber(10));  // Output: positive
console.log(checkNumber(-5));  // Output: negative
console.log(checkNumber(0));   // Output: zero
