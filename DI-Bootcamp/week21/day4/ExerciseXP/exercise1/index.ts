// Exercise 1: Class with Access Modifiers

class Employee {
  private name: string;
  private salary: number;
  public position: string;
  protected department: string;

  constructor(name: string, salary: number, position: string, department: string) {
    this.name = name;
    this.salary = salary;
    this.position = position;
    this.department = department;
  }

  public getEmployeeInfo(): string {
    return `Name: ${this.name}, Position: ${this.position}`;
  }
}

// Test the class
const employee = new Employee("John Doe", 50000, "Software Engineer", "IT");
console.log(employee.getEmployeeInfo());
console.log(`Position: ${employee.position}`); // Public property accessible
// console.log(employee.name); // Error: Property 'name' is private
// console.log(employee.salary); // Error: Property 'salary' is private
// console.log(employee.department); // Error: Property 'department' is protected
