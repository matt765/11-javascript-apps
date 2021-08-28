const converterForm = document.getElementById('converterForm');

converterForm.addEventListener('submit', function(e) {
	e.preventDefault();
	let formValues = {};
	formValues.amount = document.getElementById('amount').value
	formValues.firstCurrency = document.getElementById('firstCurrency').value.toUpperCase();
	formValues.secondCurrency = document.getElementById('secondCurrency').value.toUpperCase();
	convert(formValues);
});

function convert(formValues) {
	fetch(`https://free.currconv.com/api/v7/convert?q=${formValues.firstCurrency}_${formValues.secondCurrency}&compact=ultra&apiKey=b3fddab97074aef273d8`)
		.then(function(resp) {
			return resp.json()
		})
		.then(function(data) {
			let rate = "";
			let x;
			for (x in data) {
				rate = data[x];
			}
			document.getElementById("conversionResult").innerHTML = (formValues.amount * rate).toFixed(2);
		})
}