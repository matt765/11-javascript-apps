

        weatherForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let cityID = document.getElementById('city').value;
            weatherBaloon(cityID);
            
        });

        function drawWeather(d) {
            var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
            var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);

            document.getElementById('location').innerHTML = d.name;
            document.getElementById('description').innerHTML = d.weather[0].description;
            document.getElementById('temp').innerHTML = celcius + '&deg;';
            document.getElementById('pressure').innerHTML = 'Pressure: ' + d.main.pressure + ' hPa';

        }

        function weatherBaloon(cityID) {
            var key = '7485738ba74b5d861b91ad0f7b6ae2dc';
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityID + '&appid=' + key)
                .then(function (resp) { 
                    return resp.json()
                 }) // Convert data to json
                .then(function (data) {
                    console.log(data);
                    drawWeather(data);
                    document.getElementById('weather').style.display = 'block';
                    
                })
                .catch(function () {
                   
                   document.getElementById("noCity").classList.toggle("invisible");
                });
        }

