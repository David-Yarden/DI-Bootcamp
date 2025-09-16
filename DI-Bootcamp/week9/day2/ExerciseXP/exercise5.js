// Function declaration
function kgToGrams1(kg) {
    return kg * 1000;
}
console.log(kgToGrams1(5)); // 5000

// Function expression
const kgToGrams2 = function(kg) {
    return kg * 1000;
}
console.log(kgToGrams2(2)); // 2000

// Difference: Function declarations are hoisted, function expressions are not

// One-line arrow function
const kgToGrams3 = kg => kg * 1000;
console.log(kgToGrams3(3)); // 3000
