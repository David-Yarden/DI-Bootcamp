// shop.js

// Import the products array from products.js
const products = require('../products');

// Function to find a product by name
function findProductByName(productName) {
  const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
  if (product) {
    console.log(`✅ Product found:
    Name: ${product.name}
    Price: $${product.price}
    Category: ${product.category}`);
  } else {
    console.log(`❌ Product "${productName}" not found.`);
  }
}

// Test the function with different product names
findProductByName("Laptop");
findProductByName("Coffee Mug");
findProductByName("Notebook");
findProductByName("Camera"); // Example of product not found
