weatherForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let cityID = document.getElementById('city').value;
    weatherBaloon(cityID);

});

function drawWeather(d) {
    const celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    document.getElementById('location').innerHTML = d.name;
    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('pressure').innerHTML = 'Pressure: ' + d.main.pressure + ' hPa';
}

function weatherBaloon(cityID) {
    const key = '7485738ba74b5d861b91ad0f7b6ae2dc';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityID + '&appid=' + key)
        .then(function(resp) {
            return resp.json()
        })
        .then(function(data) {
            drawWeather(data);
            document.getElementById('weather').style.display = 'block';
        })
        .catch(function() {
            document.getElementById("noCity").classList.toggle("invisible");
        });
}