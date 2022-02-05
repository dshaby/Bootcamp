const express = require('express');

const app = express();

const port = 3000

// app.get('/', (request, response) => {
//     // res.send('Hello World!')
//     console.log(request);
//     response.send("<h1>Hello, World!</h1>");
// })

// SAME as:
app.get('/', function (request, response) { //callback function with request & response
    console.log(request);
    response.send("<h1>Hello, World!</h1>");
})

app.get('/contact', (req, res) => {
    res.send("Contact me at shaby@gmail.com");
    console.log(req);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

// app.get('/about', (req, res) => {
//     res.send("This is me okay? :)");
//     console.log(req);
// });

app.get('/about', (req, res) => {
    res.send("This is me better? :)");
    console.log(req);
});

app.get('/hobbies', (req, res) => {
    res.send("<ul><li>Coffee</li><li>Code</li><li>Love</li></ul>");
    console.log(req);
})