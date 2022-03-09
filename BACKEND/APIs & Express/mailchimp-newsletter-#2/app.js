const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "37eee9e90d855211c79a7892792252bd-us14",
    server: "us14",
});
// API: 

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    const subscriber = {
        fName: req.body.firstName,
        lName: req.body.lastName,
        email: req.body.email
    }
    const run = async () => {
        try {
            const response = await mailchimp.lists.addListMember("57667409b4", {
                email_address: subscriber.email,
                merge_fields: {
                    FNAME: subscriber.fName,
                    LNAME: subscriber.lName,
                },
                status: "subscribed",
            });
            console.log(response);
            res.redirect('/success');
        }
        catch (error) {
            console.log(error);
            res.redirect('/failure');
        }
    }
    run();
});

app.get('/success', (req, res) => {
    res.render('success');
});

app.get('/failure', (req, res) => {
    res.render('failure');
})

app.get('*', function (req, res) {
    res.status(401).render('failure');
});

app.get('*', function (req, res) {
    res.status(404).render('failure');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

// FIGURE out how to handle errors....