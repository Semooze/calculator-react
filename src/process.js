function displayToInfix(value) {
    if (!value) return [];
    if (typeof value !== "string") return [];
    const infix = value.split(" ")
        .map((input) => { return parseInt(input, 10) ? parseInt(input, 10) : input });
    return infix.slice(-1).pop() === '' ? infix.slice(0, -1) : infix;
}

function infixToPostfix(infix) {
    if (!Array.isArray(infix)) return [];
    var stack = [];
    var postfix = [];
    if (Number.isInteger(infix.slice(-1).pop())) {
        infix.forEach((input) => {
            if (!Number.isInteger(input)) {
                if (stack.length) postfix.push(stack.pop());
                stack.push(input)
            }

            if (Number.isInteger(input)) {
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
        if (Number.isInteger(input)) {
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

    if (Number.isInteger(parseInt(value, 10))) {
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