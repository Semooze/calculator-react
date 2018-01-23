function isNumber(n) {
    return !Number.isNaN(n) && Number.isFinite(n);
}

function isOperator(n) {
    return (n === "+" || n === "-" || n === "*" || n === "/") ? true : false;
}

function precisionRound(number, precision) {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function doMath(a, operator, b) {
    let c = null;
    if (operator === "+") c = a + b;
    if (operator === "-") c = a - b;
    if (operator === "*") c = a * b;
    if (operator === "/") c = a / b;
    if (c === null) return 0;
    return c;
}

function displayToInfix(value) {
    if (!value) return [];
    if (typeof value !== "string") return [];
    let infix = value.split(" ")
        .map((input) => { return parseFloat(input, 10) ? parseFloat(input, 10) : input });
    return infix.slice(-1).pop() === '' ? infix.slice(0, -1) : infix;
}

function infixToPostfix(infix) {
    if (!Array.isArray(infix)) return [];
    const PRECEDENCE = {
        "+": 13,
        "-": 13,
        "*": 14,
        "/": 14
    };
    let stack = [];
    let postfix = [];
    let lastCharactor = infix.slice(-1).pop();
    if (isNumber(lastCharactor) || lastCharactor === ")") {
        infix.forEach((input) => {

            if (isNumber(input)) {
                postfix.push(input);
                return;
            }

            const STACKLENGTH = stack.length;

            if (STACKLENGTH) {
                if (input === "(") stack.push(input);

                if (input === ")") {
                    for (let i = 0; i < STACKLENGTH; i++) {
                        let item = stack.pop();
                        if (item === "(") break;
                        postfix.push(item);
                    }
                }

                if (isOperator(input)) {
                    for (let i = 0; i < STACKLENGTH; i++) {
                        let item = stack.pop();
                        if (item === "(" || PRECEDENCE[item] < PRECEDENCE[input]) {
                            stack.push(item);
                            break;
                        }
                        postfix.push(item);
                    }
                    stack.push(input);
                }

                return;
            }

            stack.push(input);

        });

        if (stack.length) stack.reverse().forEach((operator) => postfix.push(operator));
        return postfix;
    }
    return [];
}

function determine(postfix) {

    if (!Array.isArray(postfix)) return 0;
    if (postfix.length < 3) return 0;
    let stack = [];
    postfix.forEach((input) => {
        if (isNumber(input)) {
            stack.push(input);
            return;
        }
        let b = stack.pop();
        let a = stack.pop();
        let c = doMath(a, input, b);
        stack.push(c);

    });
    return precisionRound(stack.pop(), 16) || 0;
}

function addValue(display, value) {

    if (!value) {
        return display === "0" ? "0" : display;
    }

    if (display === "" || display === "0") {
        return (value === "+" || value === "*" || value === "/" || value === ")") ? display : `${value}`;
    }

    let lastCharacter = display.trim().split(" ").pop();

    if (lastCharacter === ")") {
        return isOperator(value) ? display + ` ${value} ` : display;
    }

    if (display.length === 1 && lastCharacter === "-") {
        if (value === "+") return "";
        if (value === "-") return "-";
        return `-${value}`;
    }

    if (isNumber(parseFloat(value, 10))) {
        return (display === "(") ? display + ` ${value}` : display + value;
    }

    if (value === "(") {
        return isNumber(parseFloat(lastCharacter, 10)) ? display : display + `${value} `;
    }

    if (value === ")") {
        return isNumber(parseFloat(lastCharacter, 10)) ? display + ` ${value}` : display;
    }

    if (lastCharacter === "*" || lastCharacter === "/") {
        return (value === "-") ? display + `${value}`
            : display.split(" ").slice(0, -2).join(" ") + ` ${value} `;
    }

    if (lastCharacter === "-" || lastCharacter === "+") {
        return display.split(" ").slice(0, -2).join(" ") + ` ${value} `;
    }

    if (lastCharacter === "(") {
        return isNumber(parseFloat(value, 10)) ? display + value : display;
    }

    return display + ` ${value} `;
}

module.exports = {
    addValue: addValue,
    determine: determine,
    infixToPostfix: infixToPostfix,
    displayToInfix: displayToInfix
}