let firstNumber = "";
let secondNumber = "";
let operator = "";
let displayNumber = "";
let pressedEqual = false;

const bottomDisplay = document.querySelector("#bottom-screen");
const topDisplay = document.querySelector("#top-screen");

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    // If button clicked is a number 
    if (!isNaN(button.value) || button.value == ".") {
        button.onclick = function() {
            // If the equal button was pressed before number, should reset the calculation 
            if (pressedEqual) {
                resetCalculator();
                pressedEqual = false;
            }
            displayNumber += button.value;
            bottomDisplay.textContent = displayNumber;
        }   
    }
    // Else if button clicked is clear
    else if (button.value == "c") {
        button.onclick = function() {
            resetBottomDisplay();
            pressedEqual = false;
        }
    }
    // Else if button clicked is all clear
    else if (button.value == "ac") {
        button.onclick = function() {
            resetCalculator();
            pressedEqual = false;
        }  
    }
    // Else if button clicked is equal operand
    else if (button.value == "=") {
        button.onclick = function() {
            // If firstNumber and operand has been filled
            if (firstNumber != "" && operator != "") {
                if (displayNumber == "") {
                    secondNumber = firstNumber;
                }
                else {
                    secondNumber = +displayNumber;
                }

                let answer = operate(firstNumber, secondNumber, operator);
                // If ERROR is thrown, show to user
                if (isNaN(answer)) {
                    resetCalculator();
                    bottomDisplay.textContent = answer;
                }
                // Display equation on top screen, answer on bottom screen
                else {
                    resetBottomDisplay();
                    bottomDisplay.textContent = answer;
                    topDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
                    firstNumber = answer; 
                    operator = "";
                    secondNumber = "";
                    pressedEqual = true;
                }
            }
            // If firstNumber and operand has not been filled
            // Do nothing?
            else {
                
            }
        }
    }
    // Else if button clicked is an operand (excluding equal operand)
    else {
        button.onclick = function() {
            pressedEqual = false;
            // If first number has not been filled, fill it up
            if (firstNumber === "") {
                firstNumber = +displayNumber;
                operator = button.value;
                displayNumber = "";
                topDisplay.textContent = `${firstNumber} ${operator}`
            }
            //  If first number has been filled and operator has been filled, add second number and calculate the answer
            else if (operator !== "") {
                secondNumber = +displayNumber;
                let answer = operate(firstNumber, secondNumber, operator);
                // If ERROR is thrown, show to user
                if (isNaN(answer)) {
                    resetCalculator();
                    bottomDisplay.textContent = answer;
                }
                else {
                    resetBottomDisplay();
                    firstNumber = answer;
                    operator = button.value;
                    bottomDisplay.textContent = answer;
                    topDisplay.textContent = `${firstNumber} ${operator}`;
                }
            }
            // If first number has been filled but operator is not filled 
            else {
                operator = button.value;
                resetBottomDisplay();
                topDisplay.textContent = `${firstNumber} ${operator}`;
            }
        }
    }
})


function resetBottomDisplay() {
    // Clears only the bottom display
    displayNumber = "";
    bottomDisplay.textContent = "";
}

function resetCalculator() {
    // Clears all displays and resets calculator memory
    resetBottomDisplay();
    firstNumber = "";
    secondNumber = "";
    operator = "";
    topDisplay.textContent = "";
}

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
    if (b == 0) {
        return "ERROR";
    }
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

        case "x":
            result = multiply(firstNumber, secondNumber);
            break;

        case "÷":
            result = divide(firstNumber, secondNumber);
            break;
    }
    if (isLongDecimal(result)) {
        result = result.toFixed(13);
    }
    return result;
}

function isLongDecimal(num) {
    if (Number.isInteger(num)) {
        return false;
    }
    else if (num.toString().split('.')[1].length > 13) {
        return true;
    }
    return false;
}


// Disable decimal button when present on screen already
let decimalButton = document.querySelector("#decimal");
bottomDisplay.addEventListener('DOMSubtreeModified', function() {
    if (bottomDisplay.textContent.includes(".")) {
        decimalButton.disabled = true;
    }
    else {
        decimalButton.disabled = false;
    }
})


// Enable keyboard support
document.addEventListener('keydown', (event) => {
    let pressedKey = event.key;
    event.preventDefault();
    
    if (pressedKey === "Backspace") {
        document.querySelector("#clear").click();
    }

    if (pressedKey === "Escape") {
        document.querySelector("#all-clear").click();
    }

    if (pressedKey === ".") {
        document.querySelector("#decimal").click();
    }

    
    
    document.getElementById(pressedKey).click();
})
