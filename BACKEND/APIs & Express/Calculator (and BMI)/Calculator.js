const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//parse html form data --> VERY IMPORTANT!
app.use(express.urlencoded());

// REGULAR CALCULATOR GET & POST REQUESTS
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', (req, res) => {
    var n1 = Number(req.body.n1); //value of user's first input
    var n2 = Number(req.body.n2); //Number converts string - #

    result = n1 + n2;

    res.send("The result of the addition is: " + result + "!");
});

// BMI GET & POST REQUESTS
app.get('/bmiCalculator', (req, res) => {
    res.sendFile(__dirname + '/bmiCalculator.html');
})

app.post('/bmiCalculator', function (req, res) {
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);

    var bmi = weight / (Math.pow(height, 2));
    res.send("The result of the bmi calculation is: " + bmi);
})

