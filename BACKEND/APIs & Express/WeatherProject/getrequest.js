app.get("/", function (req, res) {
    // before sending results back to client, first
    // GET the info
    // Must include "https://" before
    // endpoint + paramaters using Postman

    const city = "Los Angeles";
    const apiKey = "5a1ec7ef7b43739a486c2e124a9084f9";
    const units = "imperial";

    const weatherurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;

    https.get(weatherurl, function (response) {
        console.log(response);
        // checking if entire process of making 
        // https GET request to weatherurl to fetch data
        // and if we get something back
        // response vs res to differentiate from above 
        // console.logging response = a bunch of data
        // response here is what we get from third party server
        // cleaner to log statuscode
        console.log(response.statusCode);

        response.on("data", function (data) {

            // ALL WEATHER DATA
            // console.log(data); = hexidecimal data
            const weatherData = JSON.parse(data); // as a JS Object :)
            // console.log(weatherData);

            // TEMPERATURE
            const temp = weatherData.main.temp;
            console.log(temp);

            // WEATHER DESCRIPTION
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);

            // ICON
            const iconID = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + iconID + "@2x.png"
            console.log(iconURL);

            // RESPOND TO CLIENT'S BROWSER:
            // why we use res (& not 'response' - External server)
            // res.send("THIS CAN ONLY BE CALLED ONCE");
            res.write("<h1>The temperature in LA is " + temp + " degrees Fahrenheit.</h1>");
            res.write("<h2>Currently, LA has a " + weatherDescription + "</h2>");
            res.write("<img src =" + iconURL + " alt = Weather-Icon" + ">");
            res.send();
        });

    })



    // res.send("Server is up & running!");
    // res (response) here is what WE send to the client
});
