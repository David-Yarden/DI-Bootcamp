// Daily Challenge: Type Guard with Union Types

type User = {
  type: 'user';
  name: string;
  age: number;
};

type Product = {
  type: 'product';
  id: number;
  price: number;
};

type Order = {
  type: 'order';
  orderId: string;
  amount: number;
};

type DataItem = User | Product | Order;

// Type guard functions
function isUser(item: DataItem): item is User {
  return item.type === 'user';
}

function isProduct(item: DataItem): item is Product {
  return item.type === 'product';
}

function isOrder(item: DataItem): item is Order {
  return item.type === 'order';
}

function handleData(data: DataItem[]): string[] {
  return data.map(item => {
    if (isUser(item)) {
      return `Hello, ${item.name}! You are ${item.age} years old.`;
    } else if (isProduct(item)) {
      return `Product ID: ${item.id}, Price: $${item.price.toFixed(2)}`;
    } else if (isOrder(item)) {
      return `Order ${item.orderId}: Total amount is $${item.amount.toFixed(2)}`;
    } else {
      return "Unknown data type";
    }
  });
}

// Test the function
const mixedData: DataItem[] = [
  { type: 'user', name: 'Alice', age: 30 },
  { type: 'product', id: 101, price: 29.99 },
  { type: 'order', orderId: 'ORD-001', amount: 150.50 },
  { type: 'user', name: 'Bob', age: 25 },
  { type: 'product', id: 102, price: 49.99 },
  { type: 'order', orderId: 'ORD-002', amount: 75.00 }
];

const results = handleData(mixedData);
results.forEach(result => console.log(result));
