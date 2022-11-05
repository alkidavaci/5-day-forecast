// Define variable
var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city');
var todayContainerEl = document.querySelector('#today-weather');
var fiveDayContainerEl = document.querySelector('#five-day-weather');
var APIKey = "032e48c7aceea9c38aa695542f70d0af";

//  Functionality to get users city
var getUsersLonLat = function (userCity) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userCity + '&appid=' + APIKey;

    // Access open weather map resources across the network
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // City's latitude and longitude from api
                    var userCityLon = data.city.coord.lon;
                    var userCityLat = data.city.coord.lat;
                });
            } else {
                // user input not a city name display statusText
                alert('Error: ' + response.statusText);
            }
        })
        // Alert error if api caller fail
        .catch(function (error) {
            alert('Unable to connect to Open Weather Map');
        });
};

