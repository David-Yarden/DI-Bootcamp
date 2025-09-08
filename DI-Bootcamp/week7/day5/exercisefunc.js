const calculator = (x,y,operator) =>
    operator === "+" ? x + y :
    operator === "-" ? x - y :
    operator === "*" ? x * y :
    operator === "/" ? x !== 0 ? x / y : "Cannot divide by zero" :
    "Invalid operator";


    console.log(calculator(10, 5, "+")); 
console.log(calculator(10, 5, "-")); 
console.log(calculator(10, 5, "*")); 
console.log(calculator(10, 5, "/")); 
console.log(calculator(10, 5, "%")); 