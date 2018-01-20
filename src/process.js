function isNumber(n) {
    return !Number.isNaN(n) && Number.isFinite(n);
}

function checkPrecedence(value1, operator, value2) {
    if (value1 === "+" || value1 === "-") {
        if ((value2 === "+" || value2 === "-") && operator === "<") return false;
        if ((value2 === "+" || value2 === "-") && operator === ">") return false;
        if ((value2 === "+" || value2 === "-") && operator === "=") return true;
        if ((value2 === "*" || value2 === "/") && operator === "<") return true;
        if ((value2 === "*" || value2 === "/") && operator === ">") return false;
        if ((value2 === "*" || value2 === "/") && operator === "=") return false;
    } 

    if (value1 === "*" || value1 === "/") {
        if ((value2 === "*" || value2 === "/") && operator === "<") return false;
        if ((value2 === "*" || value2 === "/") && operator === ">") return false;
        if ((value2 === "*" || value2 === "/") && operator === "=") return true;
        if ((value2 === "+" || value2 === "-") && operator === "<") return false;
        if ((value2 === "+" || value2 === "-") && operator === ">") return true;
        if ((value2 === "+" || value2 === "-") && operator === "=") return false;
    }


    return false;
}

function displayToInfix(value) {
    if (!value) return [];
    if (typeof value !== "string") return [];
    const infix = value.split(" ")
        .map((input) => { return parseFloat(input, 10) ? parseFloat(input, 10) : input });
    return infix.slice(-1).pop() === '' ? infix.slice(0, -1) : infix;
}

function infixToPostfix(infix) {
    if (!Array.isArray(infix)) return [];
    var stack = [];
    var postfix = [];
    var lastCharactor = infix.slice(-1).pop();
    if (isNumber(lastCharactor) || lastCharactor === ")") {
        infix.forEach((input) => {
            if (!isNumber(input)) {
                if (stack.length) {
                    if (input === "(") {
                        stack.push(input); 
                    }
                    else if (input === ")") {
                        const stackLength = stack.length;
                        for (let i = 0; i < stackLength; i++) {
                            let item = stack.pop();
                            if (item === "(") break;
                            postfix.push(item);
                        }
                    } else {
                        const stackLength = stack.length;
                        for (let i = 0; i < stackLength; i++) {
                            let item = stack.pop();
                            if (item === "(" || checkPrecedence(item, "<", input)) {
                                stack.push(item); 
                                break;
                            }
                            postfix.push(item);
                        }
                        stack.push(input); 
                    }
                } else {
                    stack.push(input);
                }
            }

            if (isNumber(input)) {
                postfix.push(input);
            }
        });

        if (stack.length) postfix.push(stack.pop());
        return postfix;
    }
    return [];
}

function determine(postfix) {

    if (!Array.isArray(postfix)) return 0;
    if (postfix.length < 3) return 0;
    var stack = [];
    postfix.forEach(function (input) {
        if (isNumber(input)) {
            stack.push(input);
            return;
        }
        console.log(stack);
        let b = stack.pop();
        let a = stack.pop();
        
        let c;
        if (input === "+") {
            c = a + b;
            stack.push(c);
        }
        if (input === "-") {
            c = a - b;
            stack.push(c);
        }

        if (input === "*") {
            c = a * b;
            stack.push(c);
        }

        if (input === "/") {
            c = a / b;
            stack.push(c);
        }

    });

    console.log(stack);
    return stack.pop() || 0;
}

// function display(display, value, show) {
//   return show === "value" ? value : display;
// }

function addValue(display, value) {
    if (display === "" || display === "0") {
        return (value === "+") ? display : `${value}`;
    }

    if (!value) {
        return display;
    }

    if (isNumber(parseFloat(value, 10))) {
        return display + value;
    }

    var lastCharacter = display.trim().split(" ").pop();

    if (display.length === 1 && lastCharacter === "-") {
        if (value === "+") return "";
        if (value === "-") return "-";
        return `-${value}`;
    }

    if (lastCharacter === "+") {
        return display.split(" ").slice(0, -2).join(" ") + ` ${value} `;
    }

    if (lastCharacter === "-") {
        return display.split(" ").slice(0, -2).join(" ") + ` ${value} `;
    }

    return display + ` ${value} `;
}

module.exports = {
    addValue: addValue,
    determine: determine,
    infixToPostfix: infixToPostfix,
    displayToInfix: displayToInfix
}