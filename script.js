
// var APIKey = "d89323496198cbc6a3903044f0f5a33b";

var APIKey = "166a433c57516f51dfab1f7edaed8413";

var cityList = $(".city-list");
var currentTime = moment().format("MM-DD-YYYY");
var currentDayCity = $("#cityCurrentWeather");
var tempElement = $("#temp");
var humidityElement = $("#humid");
var windElement = $("#wind");
var UVElement = $("#UV");

var day1date = $("#day1date");
var day2date = $("#day2date");
var day3date = $("#day3date");
var day4date = $("#day4date");
var day5date = $("#day5date");

var day1Icon = $("#day1Icon");
var day2Icon = $("#day2Icon");
var day3Icon = $("#day3Icon");
var day4Icon = $("#day4Icon");
var day5Icon = $("#day5Icon");

var day1temp = $("#day1temp");
var day2temp = $("#day2temp");
var day3temp = $("#day3temp");
var day4temp = $("#day4temp");
var day5temp = $("#day5temp");

var day1humidity = $("#day1humidity");
var day2humidity = $("#day2humidity");
var day3humidity = $("#day3humidity");
var day4humidity = $("#day4humidity");
var day5humidity = $("#day5humidity");


$("#search-btn").on("click", function () {
    getCurrentWeather();
    getWeatherForecast();
});

function getCurrentWeather() {
    var cityName = $("#city-search").val();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var tempInFarenheit = parseInt((response.main.temp - 273.15) * 1.80 + 32);
        console.log(response);
        currentDayCity.text(response.name + " " + currentTime);
        $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png").appendTo(currentDayCity);
        tempElement.text(response.main.temp + "°F");
        humidityElement.text(response.main.humidity + "%");
        windElement.text(response.wind.speed);

        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;
        // Building query URL to retrieve UV Index based on city searched
        var queryUVURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon;

        $.ajax({
            url: queryUVURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            UVElement.text(response.value);
        });

    });

}

function getWeatherForecast() {
    $(".forecast").css("display", "block");
    var cityName = $("#city-search").val();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;

        var queryURLForecast = "http://api.openweathermap.org/data/2.5/forecast?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&cnt=5"

        $.ajax({
            url: queryURLForecast,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            day1Icon.attr("src", "https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png");
            day2Icon.attr("src", "https://openweathermap.org/img/w/" + response.list[1].weather[0].icon + ".png");
            day3Icon.attr("src", "https://openweathermap.org/img/w/" + response.list[2].weather[0].icon + ".png");
            day4Icon.attr("src", "https://openweathermap.org/img/w/" + response.list[3].weather[0].icon + ".png");
            day5Icon.attr("src", "https://openweathermap.org/img/w/" + response.list[4].weather[0].icon + ".png");

            day1temp.text(response.list[0].main.temp + "°F");
            day2temp.text(response.list[1].main.temp + "°F");
            day3temp.text(response.list[2].main.temp + "°F");
            day4temp.text(response.list[3].main.temp + "°F");
            day5temp.text(response.list[4].main.temp + "°F");

            day1humidity.text(response.list[0].main.humidity + "%");
            day2humidity.text(response.list[1].main.humidity + "%");
            day3humidity.text(response.list[2].main.humidity + "%");
            day4humidity.text(response.list[3].main.humidity + "%");
            day5humidity.text(response.list[4].main.humidity + "%");
            
        });
    });
}

