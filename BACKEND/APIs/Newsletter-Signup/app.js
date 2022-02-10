const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

app.use(express.urlencoded());



app.get('/', function (req, res) {
    res.send("Hello World!");
});

app.listen(port, function () {
    console.log("App listening on port " + port);
});
