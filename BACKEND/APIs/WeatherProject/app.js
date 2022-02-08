const express = require('express');
// Requiring Express Module
const https = require("https");
// Requiring Https module. No need to install, since already
// included in native node modules
const app = express();
// Initiliazing new express app

app.get("/", function (req, res) {
    // before sending results back to client, first
    // GET the info
    // Must include "https://" before
    // endpoint + paramaters using Postman

    const weatherurl = "https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&appid=5a1ec7ef7b43739a486c2e124a9084f9&units=imperial"

    https.get(weatherurl, function (response) {
        console.log(response);
        // checking if entire process of making 
        // https GET request to weatherurl to fetch data
        // and if we get something back
        // response vs res to differentiate from above 
        // logging response = a bunch of data
        // response here is what we get from third party server
        // better to log statuscode
        console.log(response.statusCode);

        response.on("data", function (data) {
            // console.log(data); = hexidecimal data
            const weatherData = JSON.parse(data);
            // as a JS Object :)
            console.log(weatherData);

            const temp = weatherData.main.temp;
            console.log(temp);
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
        })

    })

    res.send("Server is up & running!");
    // res (response) here is what WE send to the client
})








app.listen(3000, function () {
    console.log("Server is running on port 3000!");
})
