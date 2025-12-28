// Exercise 2: Type Guards with Union Types

function describeValue(value: number | string): string {
  if (typeof value === "number") {
    return "This is a number";
  } else {
    return "This is a string";
  }
}

console.log(describeValue(42));        // Output: This is a number
console.log(describeValue("hello"));   // Output: This is a string
console.log(describeValue(3.14));      // Output: This is a number
console.log(describeValue("world"));   // Output: This is a string
