// CALCULATOR PROGRAM

const display = document.getElementById('display');
const historyList = document.getElementById('history-list');

function appendToDisplay(input) {

    if (display.value === "Error") {
        clearDisplay();
    }

    const lastChar = display.value.slice(-1);

    if (isOperator(lastChar) && isOperator(input)) {
        return;
    }

    if (input === ".") {
        const parts = display.value.split(/[\+\-\*\/]/);
        if (parts[parts.length - 1].includes(".")) return;
    }

    display.value += input;
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const expression = display.value;
        const result = eval(display.value);

        if (result === undefined || result === null || isNaN(result)) {
            display.value = "Error";
        } else {
            display.value = result;

            // --- ADD TO HISTORY ---
            addToHistory(expression, result);
        }

    } catch (error) {
        display.value = "Error";
    }
}

function addToHistory(expr, result) {
    const li = document.createElement("li");
    li.textContent = `${expr} = ${result}`;
    historyList.prepend(li); // novi ide na vrh

    // limit 20 unosa
    if (historyList.children.length > 20) {
        historyList.removeChild(historyList.lastChild);
    }
}

// --- KEYBOARD SUPPORT ---
document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        calculate();
        return;
    }

    if (e.key === "Backspace") {
        deleteLast();
        return;
    }

    if (
        (e.key >= "0" && e.key <= "9") ||
        ['+', '-', '*', '/', '.'].includes(e.key)
    ) {
        appendToDisplay(e.key);
    }
});
