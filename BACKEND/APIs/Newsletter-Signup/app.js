const express = require('express');
const https = require('https');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.static(__dirname)); // Serving static files

// GET REQUEST *************************
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

// MAILCHIMP INTEGRATION ***************
mailchimp.setConfig({
    apiKey: "e01b20ae8ea0445e5761fba8e7b20f65-us14",
    server: "us14",
});

// POST REQUEST *********************
app.post("/", function (req, res) {
    console.log("Post request was received!");
    var fName = req.body.firstName;
    var lName = req.body.lastName;
    var emailAddress = req.body.emailAddress;

    console.log(fName, lName, emailAddress);

    // ADDING A CONTACT TO OUR MAILCHIMP AUDIENCE!
    const listID = "57667409b4";
    const subscriber = {
        firstName: fName,
        lastName: lName,
        email: emailAddress
    };

    async function run() {
        const response = await mailchimp.lists.addListMember(listID, {
            email_address: subscriber.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscriber.firstName,
                LNAME: subscriber.lastName
            }
        });
        console.log("Successfully added contact as an audience member. The contact's ID is " + response.id + ".");
    }

    run();

    res.sendFile(__dirname + "/success.html");
});

app.listen(port, function () {
    console.log("App listening on port " + port);
});

// API KEY:
// e01b20ae8ea0445e5761fba8e7b20f65-us14

// Audience ID:
// 57667409b4