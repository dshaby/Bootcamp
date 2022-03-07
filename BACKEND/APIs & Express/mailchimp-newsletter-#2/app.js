const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "e7f1c7e00ca9e55250f0d7b210cac6c2-us14",
    server: "us14",
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {

    try {
        const run = async () => {
            const response = await mailchimp.lists.addListMember("57667409b4", {
                email_address: req.body.email,
                merge_fields: {
                    FNAME: req.body.firstName,
                    LNAME: req.body.lastName,
                },
                status: "subscribed",
            });

            console.log(response);
            console.log("Apparantly successful");
        }

        run();

    } catch (error) {
        console.log("This is error: " + error);
        console.log("Someting failed?");
        res.redirect('failure');
    };

})

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