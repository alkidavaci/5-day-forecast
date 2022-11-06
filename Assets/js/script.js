// Define variable
var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#city');
var todayContainerEl = document.querySelector('#today-weather');
var fiveDayContainerEl = document.querySelector('#five-day-weather');
var APIKey = "032e48c7aceea9c38aa695542f70d0af";

// Functionality from Kelvin to Fahrenheit
function kelvinToFahrenheit(k) {
    var fahrenheit = 1.8 * (k - 273) + 32;
    return fahrenheit.toFixed(2);
}

// Functionality from MPS to MPH
function mpsToMph(mps) {
    var mph = mps * 2.23694;
    return mph.toFixed(2);
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

//Display current day data
function displayTodayData(data) {
    // Create h2 tag, place text city name, append tag in the div id=today-weather
    var cityDisplayEl = document.createElement('h2');
    cityDisplayEl.textContent = data.city.name
    todayContainerEl.appendChild(cityDisplayEl)

    // Create span tag, place text city name, append tag in the h2
    var dateDisplayEl = document.createElement('span');
    dateDisplayEl.textContent = " (" + moment(data.list[0].dt_txt).format('L') + ")";
    cityDisplayEl.appendChild(dateDisplayEl)

    // Create h3 tag, place text temperature in Fahrenheit, append tag in the h3            
    var tempDisplayEl = document.createElement('h4');
    tempDisplayEl.textContent = 'Temp: ' + kelvinToFahrenheit(data.list[0].main.temp) + ' \u{2109}'
    todayContainerEl.appendChild(tempDisplayEl)

    // Create h3 tag, place text wind in MPH, append tag in the h3 
    var windDisplayEl = document.createElement('h4');
    windDisplayEl.textContent = 'Wind: ' + mpsToMph(data.list[0].wind.speed) + ' MPH'
    todayContainerEl.appendChild(windDisplayEl)

    // Create h3 tag, place text humidity percentage, append tag in the h3 
    var humidityDisplayEl = document.createElement('h4');
    humidityDisplayEl.textContent = 'Humidity: ' + data.list[0].main.humidity + ' \u{0025}'
    todayContainerEl.appendChild(humidityDisplayEl)

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
                    // Call function to display the data
                    getUsersCity(userCityLat, userCityLon)
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

                    // If div id=today-weather is empty, display today data
                    if (todayContainerEl === "") {
                        displayTodayData(data);
                    }
                    else {
                        // Empty div id=today-weather than display today data
                        todayContainerEl.innerHTML = "";
                        displayTodayData(data);
                    }


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