const express = require('express');
const res = require('express/lib/response');
const { default: mongoose } = require('mongoose');
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));

const dates = require('./dates');

const workToDolist = ['Work List'];

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
// HOME ROUTE
app.get('/', (req, res) => {
    Item.find({}, function (err, foundItems) {
        if (err) { console.log(err); }
        else if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) { console.log(err); }
                else { console.log("Successfully insertedMany default items into the Item Model Database"); }
            });
            foundItems = defaultItems;
        };

        res.render('index', {
            ejsListType: "Regular To-Do-List",
            ejsTodaysDate: dates.todaysDate(),
            ejsWeekend: dates.weekend(),
            ejsToDoList: foundItems,
            ejsDeleteRoute: "/delete",
            ejsRoute: "/"
        });
    });
});
// ADDING TO DB
app.post('/', (req, res) => {

    const newItem = new Item({
        name: req.body.newItem
    });

    newItem.save(function () {
        console.log("Added " + newItem + " to the collection");
        res.redirect('/');
    });
});

// DELETING FROM DB
app.post("/delete", (req, res) => {
    checkedItem = req.body.checkedItem;

    Item.findByIdAndRemove(checkedItem, function (err, foundItems) {
        if (err) { console.log(err); }
        else {
            console.log(checkedItem);
            console.log("Successfully deleted " + checkedItem);
            res.redirect("/");
        }
    });
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function createDynamicModel(DynamicListModel, dynamicListCollection) {
    DynamicListModel = mongoose.model(dynamicListCollection, toDoListSchema);

    // Create documents
    const firstItem = new DynamicListModel({
        name: dynamicListCollection
    });
    const secondItem = new DynamicListModel({
        name: "Second " + dynamicListCollection + " item"
    });

    const defaultDynamicItems = [firstItem, secondItem];

    addDynamicItems(DynamicListModel, defaultDynamicItems);

}

function addDynamicItems(DynamicListModel, defaultDynamicItems, urlDynamicList) {
    DynamicListModel.find({}, function (err, foundItems) {
        if (err) { console.log(err); }
        else if (foundItems.length === 0) {
            DynamicListModel.insertMany(defaultDynamicItems, function (err) {
                if (err) { console.log(err); }
                else { console.log("Successfully inserted defaultDynamicItems " + defaultDynamicItems); }
            });
            foundItems = defaultDynamicItems;
        }
    });

    loadDynamicPage(DynamicListModel, urlDynamicList);

}

function loadDynamicPage(DynamicListModel, urlDynamicList) {
    DynamicListModel.find({}, function (err, foundItems) {
        if (err) { console.log(err); }
        else {
            console.log("found the items Properly");
            console.log(foundItems);
            // res.render("index", {
            //     ejsListType: DynamicListModel + " List",
            //     ejsWeekend: dates.weekend(),
            //     ejsTodaysDate: dates.todaysDate(),
            //     ejsToDoList: foundItems,
            // ejsDeleteRoute: "/:" + urlDynamicList,
            // ejsRoute: "/" + urlDynamicList
            // })
        }
    })
    res.redirect("/");
}

app.get("/:listName", (req, res) => {
    const urlDynamicList = req.params.listName;
    const DynamicListModel = capitalizeFirstLetter(urlDynamicList);
    const dynamicListCollection = capitalizeFirstLetter(urlDynamicList);

    createDynamicModel(DynamicListModel, dynamicListCollection, urlDynamicList);
});

app.post("/:listName", (req, res) => {
    checkedItem = req.body.checkedItem;
    //same DynamicList??
    DynamicList.findByIdAndRemove(checkedItem, function (err) {
        if (err) { console.log(err); }
        else {
            console.log(checkedItem);
            console.log("Successfully deleted " + checkedItem);
            res.redirect("/" + dynamicList);
            // Looks fine here too.
        }
    });
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
