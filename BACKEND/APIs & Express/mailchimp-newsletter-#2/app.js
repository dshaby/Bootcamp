const express = require('express');
const methodOverride = require('method-override');
const app = express();
const apiKey = require('./apiKey');
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: apiKey.getAPIKey(),
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
                status: "subscribed",
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

app.listen(3000, () => console.log('Example app listening on port 3000!'));