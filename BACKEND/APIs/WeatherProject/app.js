const express = require('express');
// Requiring Express Module
const https = require("https");
// Requiring Https module. No need to install, since already
// included in native node modules
const app = express();
// Initiliazing new express app

app.use(express.urlencoded()); //to parse HTML FORM DATA
// REQUIRED!

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    // console.log("Post request received!");
    // So, post request was received by our server
    // console.log(req.body.cityName);
    // So, cityName is logging correctly

    const city = req.body.cityName;
    const apiKey = "5a1ec7ef7b43739a486c2e124a9084f9";
    const units = "imperial";

    const weatherurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;

    https.get(weatherurl, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {

            // ALL WEATHER DATA
            const allWeatherData = JSON.parse(data);
            console.log(allWeatherData);

            // TEMPERATURE
            const temp = allWeatherData.main.temp;
            console.log(temp);

            // WEATHER DESCRIPTION
            const weatherDescription = allWeatherData.weather[0].description;
            console.log(weatherDescription);

            // ICON
            const iconID = allWeatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";
            console.log(iconURL);

            res.write("<html>The city you searched: " + city);
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Fahrenheit.</h1>");
            res.write("<h2>Currently, the weather in " + city + " is " + weatherDescription + ".</h2>");
            res.write("<img src =" + iconURL + " alt = Weather-Icon" + "></html>");
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Server is running on port 3000!");
})
