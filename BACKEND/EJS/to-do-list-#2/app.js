const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));

const dates = require('./dates');

const regularToDoList = ["Buy Food", "Cook Food", "EAT IT!!!"];
const workToDolist = ['Work List'];

app.get('/', (req, res) => {
    res.render('index', {
        ejsListType: "Regular To-Do-List",
        ejsTodaysDate: dates.todaysDate(),
        ejsWeekend: dates.weekend(),
        ejsToDoList: regularToDoList,
        ejsRoute: "/"
    })
});

app.post('/', (req, res) => {
    regularToDoList.push(req.body.newItem);
    res.redirect('/');
})

app.get('/work', (req, res) => {
    res.render('index', {
        ejsListType: "Work To-Do-List!",
        ejsWeekend: dates.weekend(),
        ejsTodaysDate: dates.todaysDate(),
        ejsToDoList: workToDolist,
        ejsRoute: "/work"
    });
})

app.post('/work', (req, res) => {
    workToDolist.push(req.body.newItem);
    res.redirect('/work');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
