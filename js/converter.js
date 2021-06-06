const converterForm = document.getElementById('converterForm');

converterForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let formValues = {};

    formValues.amount = document.getElementById('amount').value
    formValues.firstCurrency =  document.getElementById('firstCurrency').value.toUpperCase(); 
    formValues.secondCurrency = document.getElementById('secondCurrency').value.toUpperCase(); 
   
   convert(formValues);

  
}
);



function convert(formValues) {
    
    fetch('https://api.exchangeratesapi.io/latest?symbols=' + formValues.firstCurrency + '&base=' + formValues.secondCurrency)
        .then(function (resp) { 
            return resp.json()
         }) // Convert data to json
        .then(function (data) {
            console.log(data);

        
  
    let rate = "";
    let x;
    for (x in data.rates) {
    rate = data.rates[x];
  }
  console.log(rate)
           
          
           document.getElementById("conversionResult").innerHTML = (formValues.amount / rate).toFixed(2);
          
        })
        .catch(function () {
            // catch any errors
        });
}

