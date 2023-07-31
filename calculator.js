let firstNumber;
let secondNumber;
let operator;

function add(a, b) {
    // Returns the sum of a and b passed to the function
    return a + b;
}

function subtract(a, b) {
    // Returns the difference of a and b passed to the function
    return a - b;
}

function multiply(a, b) {
    // Returns the product of a and b passed to the function
    return a * b;
}

function divide(a, b) {
    // Returns the quotient of a and b passed to the function
    return a / b;
}

function operate(firstNumber, secondNumber, operator) {
    let result;
    switch(operator) {
        case "+":
            result = add(firstNumber, secondNumber);
            break;

        case "-":
            result = subtract(firstNumber, secondNumber);
            break;

        case "*":
            result = multiple(firstNumber, secondNumber);
            break;

        case "/":
            result = divide(firstNumber, secondNumber);
            break;
    }

    return result;
}