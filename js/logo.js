document.addEventListener("load", resetValues());

function fancyFont() {
	const newValue = document.getElementById('fancyFont').value;
	document.getElementById("fancy-text").style.fontFamily = newValue;
}

function fancySize() {
	const newValue = document.getElementById('fancySize').value;
	document.getElementById("fancy-text").style.fontSize = newValue;
}

function fancyColor() {
	const newValue = document.getElementById('fancyColor').value;
	document.getElementById("fancy-text").style.color = newValue;
}

function fancyBg() {
	const newValue = document.getElementById('fancyBg').value;
	document.getElementById("fancy-container").style.background = newValue;
}

function fancyBorder() {
	const newValue = document.getElementById('fancyBorder').value;
	document.getElementById("fancy-container").classList.remove("border-secondary", "border-primary", "border-light", "border-success", "border-danger", "border-warning");
	document.getElementById("fancy-container").classList.add(newValue);
}

function fancyContent() {
	const newValue = document.getElementById('fancyContent').value;
	document.getElementById("fancy-text").innerHTML = newValue;
}

function resetFancy() {
	document.getElementById("fancy-text").style.fontFamily = "Amatic SC";
	document.getElementById("fancy-text").style.fontSize = "3em";
	document.getElementById("fancy-text").style.color = "black";
	document.getElementById("fancy-container").style.background = "lightblue";
	document.getElementById("fancy-container").classList.remove("border-secondary", "border-primary", "border-light", "border-success", "border-danger", "border-warning");
	document.getElementById("fancy-container").classList.add("border-secondary");
	document.getElementById("fancy-text").innerHTML = "The quick brown fox jumps over the lazy dog";
}

function resetValues() {
	document.getElementById('fancyContent').value = "The quick brown fox jumps over the lazy dog";
}