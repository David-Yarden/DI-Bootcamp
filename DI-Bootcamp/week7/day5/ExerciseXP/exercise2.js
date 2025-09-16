const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry": 1
};  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry": 10
}; 

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
    let total = 0;

    for (let item of shoppingList) {
        // Check if the item exists in stock and is available
        if (item in stock && stock[item] > 0) {
            total += prices[item];    // Add price to total
            stock[item] -= 1;         // Bonus: decrease stock by 1
        }
    }

    return total;
}

// Call the function
const totalPrice = myBill();
console.log("Total price:", totalPrice);
console.log("Updated stock:", stock);
