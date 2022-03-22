const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));

const dates = require('./dates');

// const regularToDoList = ["Buy Food", "Cook Food", "EAT IT!!!"];
// const workToDolist = ['Work List'];

// Creating mongoose DB
mongoose.connect("mongodb://localhost:27017/todolistDB");

// Create Schema
const toDoListSchema = {
    name: {
        type: String,
        required: [true, "Needs a value for the to-do item"]
    }
};

// Create model
const Item = mongoose.model("Item", toDoListSchema);
// Create a document
const buyFood = new Item({
    name: "Buy Food"
});

const cookFood = new Item({
    name: "Cook Food"
});

const eatFood = new Item({
    name: "Eat Food"
});

const defaultItems = [buyFood, cookFood, eatFood];

app.get('/', (req, res) => {
    Item.find({}, function (err, foundItems) {
        if (err) { console.log(err); }

        // First time logging on:
        else if (foundItems.length === 0) {

            Item.insertMany(defaultItems, function (err) {
                if (err) { console.log(err); }
                else { console.log("Successfully saved default items into the Item Model Database"); }
            });
            foundItems = defaultItems;
        }
        res.render('index', {
            ejsListType: "Regular To-Do-List",
            ejsTodaysDate: dates.todaysDate(),
            ejsWeekend: dates.weekend(),
            ejsToDoList: foundItems,
            ejsRoute: "/"
        });
    });
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
