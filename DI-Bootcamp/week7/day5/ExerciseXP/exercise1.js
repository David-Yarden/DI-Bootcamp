// Function without parameter (divisible by 23)
function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    let result = [];

    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            result.push(i);
            sum += i;
        }
    }

    console.log(result.join(" "));
    console.log("Sum:", sum);
}

// Default behavior (divisible by 23)
displayNumbersDivisible();

// Bonus examples:
displayNumbersDivisible(3);   // divisible by 3
displayNumbersDivisible(45);  // divisible by 45
