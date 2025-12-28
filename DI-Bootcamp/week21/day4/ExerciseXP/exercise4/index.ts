// Exercise 4: Static Properties and Methods

class Calculator {
  static add(a: number, b: number): number {
    return a + b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }
}

// Call static methods without creating an instance
console.log(`5 + 3 = ${Calculator.add(5, 3)}`);
console.log(`10 - 4 = ${Calculator.subtract(10, 4)}`);
console.log(`100 + 50 = ${Calculator.add(100, 50)}`);
console.log(`20 - 8 = ${Calculator.subtract(20, 8)}`);
