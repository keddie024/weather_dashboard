$(document).ready(function() {
    const myKey = "67312692d84f9dee845148cd2f7cd327";
    var searchButton = $("#search-button");
    var cityButton = $(".city-btn");
    var fiveDay = $("#5-day");


    // if (localStorage.length > 0) {
    //     var cityList = JSON.parse (localStorage.getItem("Cities"));
    // }

    // for (i = 1; i < cityList.length; i++) {
    //     var 
    // }


    var oldCity = function () {
        var city = $("#user-city");
        city.val(this.textContent);
        getWeather();
    }

    var getWeather = function() {
        console.log("clicked");
        var city = $("#user-city").val();
        console.log(city);
        var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myKey + "&units=imperial";

        fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            $("#city-name").text(data.name);
            var locale = data.timezone / 60;
            var date = moment().utcOffset(locale).format("MM/DD/YY");
            $("#current-date").text(date);
            $("#city-temp").text("Temp: " + Math.floor(data.main.temp) + "°F");
            $("#city-wind").text("Wind: " + Math.floor(data.wind.speed) + " MPH");
            $("#city-hum").text("Humidity: " + Math.floor(data.main.humidity) + " %");

            fiveDay.removeClass("hide");


            // $("#city-UV").children().eq(4).text(data.name);
        })

    }

    searchButton.on("click", getWeather);

    cityButton.on("click", oldCity);

})