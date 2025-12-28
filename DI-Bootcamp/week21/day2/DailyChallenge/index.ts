// Daily Challenge: Union Type Validator

function validateUnionType(value: any, allowedTypes: string[]): boolean {
  const valueType = typeof value;

  for (const type of allowedTypes) {
    if (valueType === type) {
      return true;
    }
  }

  return false;
}

// Demonstrate usage with different types
const stringValue = "Hello";
const numberValue = 42;
const booleanValue = true;
const objectValue = { name: "Alice" };
const undefinedValue = undefined;

// Test with string and number allowed
console.log(`"${stringValue}" is string or number:`, validateUnionType(stringValue, ["string", "number"])); // true
console.log(`${numberValue} is string or number:`, validateUnionType(numberValue, ["string", "number"])); // true
console.log(`${booleanValue} is string or number:`, validateUnionType(booleanValue, ["string", "number"])); // false

// Test with boolean allowed
console.log(`${booleanValue} is boolean:`, validateUnionType(booleanValue, ["boolean"])); // true

// Test with object allowed
console.log(`object is object:`, validateUnionType(objectValue, ["object"])); // true
console.log(`${numberValue} is object:`, validateUnionType(numberValue, ["object"])); // false

// Test with multiple types
console.log(`"${stringValue}" is string, number, or boolean:`, validateUnionType(stringValue, ["string", "number", "boolean"])); // true
console.log(`undefined is undefined:`, validateUnionType(undefinedValue, ["undefined"])); // true
