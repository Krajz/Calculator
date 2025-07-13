// Get DOM elements
const scoreDisplay = document.getElementById("score");
const buttons = document.querySelectorAll(".button");

// Initialize calculator state
let currentInput = "";
let expression = "";

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener("click", () => handleButtonClick(button.id));
        handleButtonClick(button.id);
    });

// Handle button clicks
function handleButtonClick(buttonId) {
    // Handle digit and operator buttons
    if (["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"].includes(buttonId)) {
        currentInput += document.getElementById(buttonId).textContent;
        expression += document.getElementById(buttonId).textContent;
        updateDisplay();
    }
    // Handle operator buttons
    else if (["plus", "minus", "times", "divide"].includes(buttonId)) {
        const operator = document.getElementById(buttonId).textContent;
        if (currentInput !== "") {
            expression += ` ${operator} `;
            currentInput = "";
            updateDisplay();
        }
    }
    // Handle equals button
    else if (buttonId === "calc") {
        try {
            const result = evaluateExpression(expression);
            currentInput = result.toString();
            expression = currentInput;
            updateDisplay();
        } catch (error) {
            scoreDisplay.textContent = "";
            currentInput = "";
            expression = "";
        }
    }
}

// Update the display with current input or expression
function updateDisplay() {
    scoreDisplay.textContent = expression || "0";
}

// Safely evaluate the mathematical expression
function evaluateExpression(expr) {
    // Replace operators with proper JavaScript syntax
    const sanitized = expr.replace(/×/g, "*").replace(/÷/g, "/");
    
    // Basic validation to prevent malicious input
    if (!/^[0-9+\-*/\s()]+$/.test(sanitized)) {
        throw new Error("Invalid expression");
    }

    // Evaluate the expression
    const result = eval(sanitized);
    
    // Check for valid number result
    if (isNaN(result) || !isFinite(result)) {
        throw new Error("Invalid result");
    }
    
    return parseFloat(result.toFixed(8));
}