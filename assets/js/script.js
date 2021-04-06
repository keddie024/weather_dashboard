$(document).ready(function() {
    const myKey = "67312692d84f9dee845148cd2f7cd327";
    var searchButton = $("#search-button");
    var oldCities = $("#searched-cities");
    var fiveDay = $("#5-day");
    var cityList = [];
    var cityParse = JSON.parse (localStorage.getItem("Cities"));

    // Starts when the page is loaded. Adds buttons to the left side of the page using cities from local storage.
    var init = function() {

        if (cityParse != null) {

            cityList = cityParse;

            var uniqueList = [...new Set(cityList)];

            for (i = 0; i < uniqueList.length; i++) {
                var oldCityBtn = document.createElement("button");
                
                oldCityBtn.textContent = uniqueList[i];
                oldCityBtn.classList.add("btn");
                oldCityBtn.classList.add("btn-primary");
                oldCityBtn.classList.add("w-100");
                oldCityBtn.classList.add("mb-3");
                oldCityBtn.classList.add("temp-button");
                oldCityBtn.addEventListener("click", oldCity);

                oldCities.append(oldCityBtn);
            }
        
        }

    }

    // When a user clicks a previously searched city, this function calls the getWeather function for that city.
    var oldCity = function () {
        var city = $("#user-city");
        city.val(this.textContent);
        getWeather();
    }

    // Fetches weather data from the API and then displays it on the page.
    var getWeather = function() {
        var city = $("#user-city").val();
        if (!city) {
            location.reload();
            return
        }
        cityList.push(city);
        localStorage.setItem("Cities", JSON.stringify(cityList));
        var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myKey + "&units=imperial";

        fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var locale = data.timezone / 60;
            var date = moment().utcOffset(locale).format("MM/DD/YY");
            $("#city-name").text(data.name + " " + date);
            $("#city-temp").text("Temp: " + Math.floor(data.main.temp) + "°F");
            $("#city-wind").text("Wind: " + Math.floor(data.wind.speed) + " MPH");
            $("#city-hum").text("Humidity: " + Math.floor(data.main.humidity) + " %");

            fiveDay.removeClass("hide");

            // Fetches data for the 5-day forecast and then displays it on the page.
            requestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + myKey + "&units=imperial";

            fetch(requestURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                for (i = 1; i < 6; i++) {
                    var forecastCard = $("#card-" + i + "");
                    forecastCard.children().eq(0).text(moment.unix(data.daily[i].dt).format("MM/DD/YY"));
                    forecastCard.children().eq(1).text(Math.floor(data.daily[i].temp.day) + "°F");
                    forecastCard.children().eq(2).text("Wind: " + Math.floor(data.daily[i].wind_speed) + " MPH");
                    forecastCard.children().eq(3).text("Humidity: " + Math.floor(data.daily[i].humidity) + " %");
                }
            })
            
        })

    }

    searchButton.on("click", getWeather);
    init();

})