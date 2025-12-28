// Exercise 2: Readonly Properties in a Class

class Product {
  readonly id: number;
  public name: string;
  public price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getProductInfo(): string {
    return `Product: ${this.name}, Price: $${this.price}`;
  }
}

// Test the class
const product = new Product(1, "Laptop", 999.99);
console.log(product.getProductInfo());
console.log(`Product ID: ${product.id}`);

// Attempt to modify readonly property
// product.id = 2; // Error: Cannot assign to 'id' because it is a read-only property

// Can modify non-readonly properties
product.name = "Gaming Laptop";
product.price = 1299.99;
console.log(product.getProductInfo());
