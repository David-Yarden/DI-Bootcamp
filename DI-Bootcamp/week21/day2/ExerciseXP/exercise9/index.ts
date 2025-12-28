// Exercise 9: Function Overloading with Default Parameters
function greet(): string;
function greet(name: string): string;
function greet(name?: string): string {
  if (name) {
    return `Hello, ${name}!`;
  }
  return "Hello, World!";
}

console.log(greet());         // Output: Hello, World!
console.log(greet("Alice"));  // Output: Hello, Alice!
