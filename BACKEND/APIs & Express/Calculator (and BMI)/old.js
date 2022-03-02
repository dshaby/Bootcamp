const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


// ROOT route
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.listen(3000, function () {
    console.log("Server is running on port 3000!");
});


app.post("/", function (req, res) {

    var n1 = Number(req.body.n1); //value of user's first input
    var n2 = Number(req.body.n2); //Number converts string - #

    result = n1 + n2;

    res.send("The result of the addition is: " + result + "!");

    console.log(req.body.num1); //in Hyper
    // res.send("Thanks for posting that!");
});