// Exercise 7: Type Assertions and Generic Constraints

interface Stringifiable {
  toString(): string;
}

function formatInput<T extends Stringifiable>(input: T): string {
  const stringValue = input.toString() as string;
  return `Formatted: [${stringValue}]`;
}

// Test with different types
console.log(formatInput(42));                    // Number
console.log(formatInput("Hello"));               // String
console.log(formatInput(true));                  // Boolean
console.log(formatInput([1, 2, 3]));             // Array
console.log(formatInput({ toString: () => "Custom Object" })); // Custom object
