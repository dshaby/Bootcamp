require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: process.env.mailchimpAPI,
    server: "us14",
});

app.get('/', (req, res) => {
    res.render('index');
});

app.put('/', (req, res) => {
    const run = async () => {
        try {
            const response = await mailchimp.lists.setListMember("57667409b4", req.body.email, {
                merge_fields: {
                    FNAME: req.body.firstName,
                    LNAME: req.body.lastName,
                },
                email_address: req.body.email,
                status_if_new: "subscribed",
            });
            console.log(response);
            res.render('success');
        }
        catch (error) {
            console.log(error);
            res.render('failure', {
                ejsErrorTitle: error.response.body.title,
                ejsErrorDetail: error.response.body.detail,
                ejsErrorStatus: error.status,
            });
        }
    }
    run();
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("App listening on port: " + port);
});