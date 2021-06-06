var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Bitcoin price in 2018 (USD)',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [13975, 9997, 10823, 6764, 9055, 7591, 6384, 7639, 7061, 6605, 6394, 4006],
            fill: false,
            lineTension: 0
        }]
    },

    // Configuration options go here
    options: {
        responsive: true
      
    }
});

var ctx = document.getElementById('myChart2').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Bitcoin price in 2019 (USD)',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [3764, 3495, 3901, 4154, 5383, 8601, 10606, 10418, 9718, 8352, 9256, 7320],
            fill: false,
            lineTension: 0,
          
        }]
    },

    // Configuration options go here
    options: {}
});

window.onload=function(){
    document.getElementById("profile-tab").click();
  };