const calculator = (a, b, c) => {
    if (b === "+") {
        return a + c;
    }
    else if (b === "-") {
        return a - c;
    }
    else if (b === "*") {
        return a * c;
    }
    else if (b === "/") {
        return a / c;
    }
    else {
        return "Invalid operator";
    }
};

console.log(calculator(3, "+", 4));
console.log(calculator(5, "-", 4));
console.log(calculator(6, "+", 2));
console.log(calculator(9, "/", 3));
console.log(calculator(9, 5, 3));