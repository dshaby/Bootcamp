const express = require('express');
const https = require('https');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();

app.use(express.urlencoded());
app.use(express.static(__dirname)); // Serving static files

// GET REQUEST *************************
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

// MAILCHIMP INTEGRATION ***************
mailchimp.setConfig({
    apiKey: "2c03accc6620f494fb3d97c740ca4eec-us14",
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
        email: emailAddress,
    };

    // const subscriber_hash = md5(subscriber.email.toLowerCase());

    // // const status = subscriber.status

    // const runn = async () => {
    //     const subscriberStatus = await mailchimp.lists.getListMember(
    //         subscriber_hash,
    //         listID,
    //     );

    //     console.log("subscriberStatus: " + subscriberStatus);
    // }

    // runn();

    async function run() {
        try {
            // if (response.status === "subscribed") {
            const response = await mailchimp.lists.addListMember(listID, {
                email_address: subscriber.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: subscriber.firstName,
                    LNAME: subscriber.lastName
                }
            });
            console.log("Successfully added contact as an audience member. The contact's ID is " + response.id + ".");
            res.sendFile(__dirname + "/success.html");
            // console.log(response.statusCode);
            // }

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
    port = 3000;
}

app.listen(port, function () {
    console.log("App listening on port: " + port);
});

// API KEY:
// e01b20ae8ea0445e5761fba8e7b20f65-us14

// Audience ID:
// 57667409b4