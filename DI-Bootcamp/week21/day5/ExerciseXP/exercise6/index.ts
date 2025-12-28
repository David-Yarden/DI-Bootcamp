// Exercise 6: Intersection Types and Type Guards
export {};

type Person = {
  name: string;
  age: number;
};

type Job = {
  position: string;
  department: string;
};

type Employee = Person & Job;

function describeEmployee(employee: Employee): string {
  if (employee.position === "Manager") {
    return `${employee.name} is a Manager in the ${employee.department} department, aged ${employee.age}.`;
  } else if (employee.position === "Developer") {
    return `${employee.name} is a Developer in the ${employee.department} department, aged ${employee.age}.`;
  } else {
    return `${employee.name} works as ${employee.position} in the ${employee.department} department, aged ${employee.age}.`;
  }
}

// Test with different employees
const manager: Employee = {
  name: "Alice",
  age: 35,
  position: "Manager",
  department: "Sales"
};

const developer: Employee = {
  name: "Bob",
  age: 28,
  position: "Developer",
  department: "IT"
};

const analyst: Employee = {
  name: "Charlie",
  age: 32,
  position: "Analyst",
  department: "Finance"
};

console.log(describeEmployee(manager));
console.log(describeEmployee(developer));
console.log(describeEmployee(analyst));
