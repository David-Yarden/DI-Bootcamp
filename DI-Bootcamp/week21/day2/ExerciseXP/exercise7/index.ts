// Exercise 7: Type Assertions
const inputElement = document.getElementById("myInput") as HTMLInputElement;

if (inputElement) {
  inputElement.value = "Hello, TypeScript!";
  console.log(`Input value set to: ${inputElement.value}`);
}
