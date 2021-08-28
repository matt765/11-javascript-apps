let playerState = true;
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById("board");
const resetButton = document.getElementById("reset");
const win = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
cells.forEach(e => e.addEventListener("click", () => play(e)));

function reset() {
	cells.forEach(e => e.classList.remove("x"));
	cells.forEach(e => e.classList.remove("circle"));
	board.classList.remove("o");
	board.classList.add("x");
	playerState = true;
}

function play(e) {
	if (!e.classList.contains("x") && !e.classList.contains("circle")) {
		const currentClass = playerState ? 'x' : 'circle';
		if (playerState == true) {
			e.classList.add("x");
			board.classList.remove("x");
			board.classList.add("o");
		} else {
			e.classList.add("circle");
			board.classList.add("x");
			board.classList.remove("o");
		}
		changeState();
		const result = whoWon(currentClass);
		if (result) {
			alert(`Player ${currentClass} won!`);
			reset();
		}
		Draw(cells);
	}
}

function Draw(cells) {
	let points = 0;
	cells.forEach(e => turns(e));

	function turns(e) {
		if (e.classList.contains("x")) {
			points++;
		}
	}

	if (points > 4) {
		alert("Draw!");
		reset();
	}
}

function changeState() {
	playerState = !playerState
}

function whoWon(currentClass) {
	return win.some(combination => {
		return combination.every(index => {
			return cells[index].classList.contains(currentClass)
		})
	})
}