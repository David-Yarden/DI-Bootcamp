// Exercise 5: Extending Interfaces with Optional and Readonly Properties

interface User {
  readonly id: number;
  name: string;
  email: string;
}

interface PremiumUser extends User {
  membershipLevel?: string;
}

function printUserDetails(user: PremiumUser): void {
  console.log(`ID: ${user.id}`);
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
  if (user.membershipLevel) {
    console.log(`Membership Level: ${user.membershipLevel}`);
  }
  console.log("---");
}

// Test with regular premium user (without membership level)
const user1: PremiumUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

// Test with premium user (with membership level)
const user2: PremiumUser = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  membershipLevel: "Gold"
};

printUserDetails(user1);
printUserDetails(user2);

// Attempting to modify readonly id would cause an error
// user1.id = 3; // Error: Cannot assign to 'id' because it is a read-only property
