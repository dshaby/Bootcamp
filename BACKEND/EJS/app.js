// SETUP
const express = require("express");
const date = require(__dirname + "/date.js");
console.log(date);

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static(__dirname + "/public"));

// TO-DO LIST *******************************************

const regularItems = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

// HOME GET REQ *****************************************
app.get("/", function (req, res) {
    const fullDate = date.getDate();
    const dayCategory = date.getTypeofDay();
    res.render('list', {
        ejsDayCategory: dayCategory,
        ejsListTitle: fullDate,
        ejsToDoItems: regularItems,
        route: "/"
    });
});

// HOME POST REQUEST *********************
app.post("/", function (req, res) {
    const item = req.body.toDoItem;
    regularItems.push(item);
    res.redirect('/');
});

// WORK GET REQ **********************************
app.get("/work", function (req, res) {
    const dayCategory = date.getTypeofDay();
    res.render("list", {
        ejsListTitle: "Work List",
        ejsDayCategory: dayCategory,
        ejsToDoItems: workItems,
        route: "/work"
    });
});

// WORK POST REQ **********************************
app.post("/work", function (req, res) {
    let item = req.body.toDoItem;
    workItems.push(item);
    res.redirect("/work");
})

// ABOUT GET REQ ******************************
app.get("/about", function (req, res) {
    res.render("about");
});

// PORT ***
app.listen(3000, function () {
    console.log("Server started on port 3000!");
});