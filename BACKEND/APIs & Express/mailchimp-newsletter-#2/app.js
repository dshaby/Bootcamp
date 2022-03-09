const express = require('express');
const methodOverride = require('method-override');
const app = express();
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
// const connect = require('connect');
app.use(express.urlencoded({ extended: true }));

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "6ca38de478a099a6b698fcca203b2acf-us14",
    server: "us14",
});
// API: f

app.get('/', (req, res) => {
    res.render('index');
});

app.put('/', (req, res) => {
    const subscriber = {
        fName: req.body.firstName,
        lName: req.body.lastName,
        email: req.body.email
    }
    const run = async () => {
        try {
            const response = await mailchimp.lists.setListMember("57667409b4", subscriber.email, {
                merge_fields: {
                    FNAME: subscriber.fName,
                    LNAME: subscriber.lName,
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