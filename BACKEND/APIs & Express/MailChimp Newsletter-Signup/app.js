const express = require('express');
const https = require('https');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serving static files

// GET REQUEST *************************
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

// MAILCHIMP INTEGRATION ***************
mailchimp.setConfig({
    apiKey: "d4a3e457ec1135a2fc523f30cbf69fcb-us14",
    server: "us14",
});

// POST REQUEST *********************
app.post("/", function (req, res) {
    // console.log(fName, lName, emailAddress);

    const listID = "57667409b4";

    async function run() {
        try {
            const response = await mailchimp.lists.addListMember(listID, {
                email_address: req.body.emailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME: req.body.firstName,
                    LNAME: req.body.lastName
                }
            });
            console.log("Successfully added contact as an audience member. The contact's ID is " + response.id + ".");
            res.sendFile(__dirname + "/success.html");
            console.log(response.statusCode);

        }
        catch (err) {

            console.log("Error Status: " + err.status);
            console.log(err);

            if (err.status === 401) {
                res.sendFile(__dirname + "/invalidAPI.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    };
    run();
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}

app.listen(port, function () {
    console.log("App listening on port: " + port);
});



// Audience ID:
// 57667409b4