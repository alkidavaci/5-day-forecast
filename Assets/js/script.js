// Define variable
var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city');
var todayContainerEl = document.querySelector('#today-weather');
var fiveDayContainerEl = document.querySelector('#five-day-weather');
var APIKey = "032e48c7aceea9c38aa695542f70d0af";

// Functionality from Kelvin to Fahrenheit
function kelvinToFahrenheit (k){
    var fahrenheit = 1.8*(k -273) + 32;
    return fahrenheit.toFixed(2);
 }
 

// Functionality for submit the city
function formSubmitCity(e) {
    e.preventDefault();
    var cityName = cityInputEl.value.trim();
    // User type a city name
    if (cityName) {
        getUsersLonLat(cityName);
    } else {
        alert('Please enter a city name');
    }
}

//  Functionality to get users weather data from the input city name
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

//  Functionality to get users weather data from the city's latitude and longitude
var getUsersCity = function (userCityLat, userCityLon) {
    var apiLUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + userCityLat + '&lon=' + userCityLon + '&appid=' + APIKey;

fetch(apiLUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)                         
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to Open Weather Map');
    });
};

// Event listener to submit the city
cityFormEl.addEventListener('submit', formSubmitCity);