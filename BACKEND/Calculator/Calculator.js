const express = require('express');
const app = express();

// ROOT route
app.get('/', function (req, res) {
    res.send("Hello World Okay?!");
})

app.listen(3000, function () {
    console.log("Server is running on port 3000!");
});
