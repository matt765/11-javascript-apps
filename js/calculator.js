let screenValue = document.getElementById("screen");
let result = document.getElementById("result");
let deleteChar = document.getElementById("deleteChar");
let clearScreen = document.getElementById("clearScreen");
let calcButtons = document.querySelectorAll('.calcButtons div');
let firstValue = '';
let secondValue = '';
let valueCheck = 1;
let currentOperator;

for (let i = 0; i < calcButtons.length; i += 1) {
    if (isNaN(calcButtons[i].innerHTML) && (calcButtons[i].innerHTML != "=")) {
        calcButtons[i].addEventListener("click", addOperator(i));
    }
    else if (calcButtons[i].innerHTML != "=") {
        calcButtons[i].addEventListener("click", addtoValue(i));
    }
}

function addtoValue(i) {
    return function () {
        if (valueCheck == 0) {
            clear();
        }
        let lastChar = screenValue.innerHTML.charAt(screenValue.innerHTML.length - 1);
        let secondLastChar = screenValue.innerHTML.charAt(screenValue.innerHTML.length - 2);
        if (calcButtons[i].innerHTML == "0") {
            if (
                (lastChar == "0") &&
                ((isNaN(secondLastChar) && secondLastChar != ".") || (secondLastChar == ""))
            ) {
            }
            else {
                if (valueCheck == 1) {
                    screenValue.innerHTML += calcButtons[i].innerHTML;
                    firstValue = firstValue.toString() + calcButtons[i].innerHTML.toString();
                }
                else {
                    secondValue = secondValue.toString() + calcButtons[i].innerHTML.toString();
                    screenValue.innerHTML += calcButtons[i].innerHTML;
                }
            }
        }
        else {
            if (valueCheck == 1) {
                screenValue.innerHTML += calcButtons[i].innerHTML;
                firstValue = firstValue.toString() + calcButtons[i].innerHTML.toString();
            }
            else {
                secondValue = secondValue.toString() + calcButtons[i].innerHTML.toString();
                screenValue.innerHTML += calcButtons[i].innerHTML;
            }
        }
    };
}

function addOperator(i) {
    return function () {
        if (screenValue.innerHTML != "") {
            // if there's already an operator
            if (isNaN(screenValue.innerHTML.slice(-1)) && calcButtons[i].innerHTML != '.') {
                var newScreen = screenValue.innerHTML.slice(0, screenValue.innerHTML.length - 1);
                screenValue.innerHTML = newScreen;
                screenValue.innerHTML += calcButtons[i].innerHTML;
                valueCheck = 2;
                if (firstValue.includes('.')) {
                    firstValue = firstValue.slice(0, -1);
                }
                currentOperator = calcButtons[i].innerHTML;
            }
            // if dot is not clicked
            else if (valueCheck == 1 && calcButtons[i].innerHTML != '.') {
                screenValue.innerHTML += calcButtons[i].innerHTML;
                valueCheck = 2;

                currentOperator = calcButtons[i].innerHTML;
            }
            else if (valueCheck == 2 && calcButtons[i].innerHTML != '.') {

                calculate();
            }
            else if (isNaN(screenValue.innerHTML.slice(-1))) {

            }
            // if dot is clicked
            else {
                //add to firstValue if there's no dot already
                if (valueCheck == 1 && !(firstValue.includes('.'))) {
                    screenValue.innerHTML += calcButtons[i].innerHTML;
                    firstValue = firstValue.toString() + calcButtons[i].innerHTML.toString();

                }
                //add to secondValue if there's no dot already
                else if (valueCheck == 2 && !(secondValue.includes('.'))) {

                    secondValue = secondValue.toString() + calcButtons[i].innerHTML.toString();
                    screenValue.innerHTML += calcButtons[i].innerHTML;
                }
            }
        }
    };
}

result.addEventListener("click", () => calculate());
clearScreen.addEventListener("click", () => clear());
deleteChar.addEventListener("click", () => deleteLast());

function calculate() {
    if (secondValue != "") {
        let calculation;
        const prev = parseFloat(firstValue)
        const current = parseFloat(secondValue)

        switch (currentOperator) {
            case '+':
                calculation = prev + current
                break
            case '-':
                calculation = prev - current
                break
            case '*':
                calculation = prev * current
                break
            case '÷':
                calculation = prev / current
                break
            default:
                return
        }
        screenValue.innerHTML = Math.round(calculation * 100) / 100;

        valueCheck = 0;
    }
}

function clear() {
    screenValue.innerHTML = "";
    firstValue = '';
    secondValue = '';
    valueCheck = 1;
}

function deleteLast() {
    if (isNaN(screenValue.innerHTML.slice(-1)) && screenValue.innerHTML.slice(-1) != '.') {
        let afterDelete = screenValue.innerHTML.slice(0, -1);
        screenValue.innerHTML = afterDelete
        valueCheck = 1;
        console.log("a")
    }
    else if (valueCheck == 1) {
        let afterDelete = screenValue.innerHTML.slice(0, -1);
        screenValue.innerHTML = afterDelete
        firstValue = firstValue.slice(0, -1);
        console.log("b")
    }
    else if (valueCheck == 2) {
        let afterDelete = screenValue.innerHTML.slice(0, -1);
        screenValue.innerHTML = afterDelete
        secondValue = secondValue.slice(0, -1);
        console.log("c")
    }
    else if (valueCheck == 0) {
        console.log("d");
        let afterDelete = screenValue.innerHTML.slice(0, -1);
        screenValue.innerHTML = afterDelete
        firstValue = afterDelete;
        secondValue = '';
        valueCheck = 1;
    }
}



