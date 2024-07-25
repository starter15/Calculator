let displayValue = '0';
let pendingOperation = null;
let operand1 = null;
let operand2 = null;

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    pendingOperation = null;
    operand1 = null;
    operand2 = null;
    updateDisplay();
}

function appendDigit(digit) {
    if (displayValue === '0' || displayValue === '-0') {
        displayValue = digit;
    } else {
        displayValue += digit;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function toggleSign() {
    if (displayValue.startsWith('-')) {
        displayValue = displayValue.slice(1);
    } else {
        displayValue = '-' + displayValue;
    }
    updateDisplay();
}

function percentage() {
    displayValue = String(parseFloat(displayValue) / 100);
    updateDisplay();
}

function setOperation(operation) {
    if (pendingOperation !== null && operand2 !== null) {
        calculate();
    }
    operand1 = parseFloat(displayValue);
    pendingOperation = operation;
    displayValue = '0';
    updateDisplay();
}

function calculate() {
    operand2 = parseFloat(displayValue);
    let result = 0;
    switch (pendingOperation) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case 'x':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
        default:
            result = operand2;
            break;
    }
    displayValue = String(result);
    updateDisplay();
    operand1 = result;
    operand2 = null;
    pendingOperation = null;
}

// Event listeners for buttons
document.querySelectorAll('.calculator button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;
        if (buttonValue >= '0' && buttonValue <= '9') {
            appendDigit(buttonValue);
        } else {
            switch (buttonValue) {
                case '+/-':
                    toggleSign();
                    break;
                case '%':
                    percentage();
                    break;
                case '.':
                    appendDecimal();
                    break;
                case 'AC':
                    clearDisplay();
                    break;
                case '+':
                case '-':
                case 'x':
                case '/':
                    setOperation(buttonValue);
                    break;
                case '=':
                    calculate();
                    break;
                default:
                    break;
            }
        }
    });
});

