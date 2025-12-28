// Exercise 3: Class Inheritance

class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): string {
    return "Some generic animal sound";
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  makeSound(): string {
    return "Bark!";
  }
}

// Test the classes
const animal = new Animal("Generic Animal");
console.log(`${animal.name} says: ${animal.makeSound()}`);

const dog = new Dog("Buddy");
console.log(`${dog.name} says: ${dog.makeSound()}`);
