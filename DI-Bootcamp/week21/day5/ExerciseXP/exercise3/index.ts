// Exercise 3: Type Casting

const someValue: any = "Hello, TypeScript!";

// Cast to string using 'as' syntax
const stringValue: string = someValue as string;

// Use it as a string
console.log(`Length of string: ${stringValue.length}`);
console.log(`Uppercase: ${stringValue.toUpperCase()}`);
console.log(`First character: ${stringValue.charAt(0)}`);
