const screenValue = document.getElementById("screen");
const result = document.getElementById("result");
const deleteChar = document.getElementById("deleteChar");
const clearScreen = document.getElementById("clearScreen");
const calcButtons = document.querySelectorAll('.calcButtons div');
let firstValue = '';
let secondValue = '';
let valueCheck = 1;
let currentOperator;

for (let i = 0; i < calcButtons.length; i += 1) {
	if (isNaN(calcButtons[i].innerHTML) && (calcButtons[i].innerHTML != "=")) {
		calcButtons[i].addEventListener("click", addOperator(i));
	} else if (calcButtons[i].innerHTML != "=") {
		calcButtons[i].addEventListener("click", addtoValue(i));
	}
}

function addtoValue(i) {
	return function() {
		if (valueCheck == 0) {
			clear();
		}
		const lastChar = screenValue.innerHTML.charAt(screenValue.innerHTML.length - 1);
		const secondLastChar = screenValue.innerHTML.charAt(screenValue.innerHTML.length - 2);
		if (calcButtons[i].innerHTML == "0") {
			if (
				(lastChar == "0") &&
				((isNaN(secondLastChar) && secondLastChar != ".") || (secondLastChar == ""))
			) {} else {
				if (valueCheck == 1) {
					screenValue.innerHTML += calcButtons[i].innerHTML;
					firstValue = firstValue.toString() + calcButtons[i].innerHTML.toString();
				} else {
					secondValue = secondValue.toString() + calcButtons[i].innerHTML.toString();
					screenValue.innerHTML += calcButtons[i].innerHTML;
				}
			}
		} else {
			if (valueCheck == 1) {
				screenValue.innerHTML += calcButtons[i].innerHTML;
				firstValue = firstValue.toString() + calcButtons[i].innerHTML.toString();
			} else {
				secondValue = secondValue.toString() + calcButtons[i].innerHTML.toString();
				screenValue.innerHTML += calcButtons[i].innerHTML;
			}
		}
	};
}

function addOperator(i) {
	return function() {
		if (screenValue.innerHTML != "") {
			// if there's already an operator
			if (isNaN(screenValue.innerHTML.slice(-1)) && calcButtons[i].innerHTML != '.') {
				const newScreen = screenValue.innerHTML.slice(0, screenValue.innerHTML.length - 1);
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
			} else if (valueCheck == 2 && calcButtons[i].innerHTML != '.') {
				calculate();
			} else if (isNaN(screenValue.innerHTML.slice(-1))) {}
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
		const afterdelete = screenValue.innerHTML.slice(0, -1);
		screenValue.innerHTML = afterdelete
		valueCheck = 1;
		console.log("a")
	} else if (valueCheck == 1) {
		const afterdelete = screenValue.innerHTML.slice(0, -1);
		screenValue.innerHTML = afterdelete
		firstValue = firstValue.slice(0, -1);
		console.log("b")
	} else if (valueCheck == 2) {
		const afterdelete = screenValue.innerHTML.slice(0, -1);
		screenValue.innerHTML = afterdelete
		secondValue = secondValue.slice(0, -1);
		console.log("c")
	} else if (valueCheck == 0) {
		console.log("d");
		const afterdelete = screenValue.innerHTML.slice(0, -1);
		screenValue.innerHTML = afterdelete
		firstValue = afterdelete;
		secondValue = '';
		valueCheck = 1;
	}
}