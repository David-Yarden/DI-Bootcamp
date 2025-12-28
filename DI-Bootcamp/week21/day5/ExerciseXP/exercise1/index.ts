// Exercise 1: Intersection Types
export {};

type Person = {
  name: string;
  age: number;
};

type Address = {
  street: string;
  city: string;
};

type PersonWithAddress = Person & Address;

const personWithAddress: PersonWithAddress = {
  name: "Alice",
  age: 30,
  street: "123 Main St",
  city: "New York"
};

console.log("Person with Address:");
console.log(`Name: ${personWithAddress.name}`);
console.log(`Age: ${personWithAddress.age}`);
console.log(`Street: ${personWithAddress.street}`);
console.log(`City: ${personWithAddress.city}`);
