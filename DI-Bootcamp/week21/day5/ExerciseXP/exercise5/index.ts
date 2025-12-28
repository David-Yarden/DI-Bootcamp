// Exercise 5: Generic Constraints

interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(value: T): void {
  console.log(`Length: ${value.length}`);
}

// Test with different types that have length property
logLength("Hello, World!");           // String has length
logLength([1, 2, 3, 4, 5]);           // Array has length
logLength({ length: 10, value: 42 }); // Custom object with length
