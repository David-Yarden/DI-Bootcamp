// Original variables
let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
};

// 1️⃣ Display fruits
const displayGroceries = () => {
    console.log("Fruits:");
    groceries.fruits.forEach(fruit => {
        console.log(fruit);
    });
};

// 2️⃣ Clone groceries and experiment with value/reference
const cloneGroceries = () => {
    console.log("\n--- Clone Groceries ---");

    // Pass by value (primitive)
    let user = client;   // copy of client
    client = "Betty";    // change original client

    console.log("client:", client); // Betty
    console.log("user:", user);     // John (unchanged)

    // Pass by reference (object)
    let shopping = groceries; // reference to same object

    shopping.totalPrice = "35$"; 
    shopping.other.paid = false;

    console.log("groceries.totalPrice:", groceries.totalPrice); // 35$
    console.log("shopping.totalPrice:", shopping.totalPrice);   // 35$

    console.log("groceries.other.paid:", groceries.other.paid); // false
    console.log("shopping.other.paid:", shopping.other.paid);   // false
};

// ✅ Invoke functions
displayGroceries();
cloneGroceries();

// Optional: check groceries after cloning
console.log("\n--- Groceries after clone ---");
console.log(groceries);
