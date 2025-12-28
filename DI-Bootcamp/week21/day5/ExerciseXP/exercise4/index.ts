// Exercise 4: Type Assertions with Union Types

function getFirstElement(arr: (number | string)[]): string {
  const firstElement = arr[0];
  return firstElement as string;
}

// Test with arrays of mixed types
const mixedArray1: (number | string)[] = ["hello", 42, "world"];
const mixedArray2: (number | string)[] = [100, "test", 200];
const mixedArray3: (number | string)[] = ["first", "second", "third"];

console.log(getFirstElement(mixedArray1)); // Output: hello
console.log(getFirstElement(mixedArray2)); // Output: 100 (treated as string)
console.log(getFirstElement(mixedArray3)); // Output: first
