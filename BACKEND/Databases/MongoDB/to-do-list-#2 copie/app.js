const express = require('express');
const res = require('express/lib/response');
const { default: mongoose } = require('mongoose');
const app = express()
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));

const dates = require('./dates');

// Creating mongoose DB
mongoose.connect("mongodb+srv://danielshaby:TBuCFs2esaUQgWDt@todocluster.mfvkp.mongodb.net/myToDoList?retryWrites=true&w=majority");

// Create Schemas
const toDoListSchema = {
    name: {
        type: String,
        required: [true, "Needs a value for the to-do item"]
    }
};

const dynamicListSchema = {
    dynamicListName: {
        type: String,
        required: [false, "You need a name for your list"]
    },
    items: [toDoListSchema]
}

// Create models
const Item = mongoose.model("Item", toDoListSchema);
const DynamicList = mongoose.model("DynamicList", dynamicListSchema);

// Create Default Docs
const listName = "general to-do"

const firstItem = new Item({
    name: "First " + listName + " item"
});

const secondItem = new Item({
    name: "Second " + listName + " item"
});

const thirdItem = new Item({
    name: "Third " + listName + " item",
});

const defaultItems = [firstItem, secondItem, thirdItem];
// Use EJS for dynamic words on the page?

// HOME ROUTE
app.get('/', (req, res) => {
    Item.find({}, async function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) { console.log(err); }
                else {
                    console.log("Successfully insertedMany default items into the Item Model Database");
                }
                foundItems = defaultItems;
                res.redirect("/");
            });
        } else {
            console.log(foundItems);
            res.render('index', {
                ejsListType: "General To-Do",
                ejsTodaysDate: dates.todaysDate(),
                ejsWeekend: dates.weekend(),
                ejsToDoList: foundItems,
                ejsDeleteRoute: "/delete",
            });
        }
    });
});

// Dynamic Route
app.get("/:listName", (req, res) => {
    const urlDynamicList = req.params.listName.toLowerCase();

    DynamicList.findOne({ dynamicListName: urlDynamicList }, function (err, foundList) {
        if (!foundList) {
            const newList = new DynamicList({
                dynamicListName: urlDynamicList,
                items: defaultItems
            });

            newList.save(function () {
                res.redirect("/" + urlDynamicList);
            });
        } else if (foundList.items.length === 0) {
            DynamicList.findByIdAndRemove(foundList._id, function (err) {
                if (err) { console.log(err); }
                else {
                    res.redirect("/" + urlDynamicList);
                }
            });
        }
        else {
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            };
            res.render("index", {
                ejsListType: capitalizeFirstLetter(urlDynamicList),
                ejsWeekend: dates.weekend(),
                ejsTodaysDate: dates.todaysDate(),
                ejsToDoList: foundList.items,
                ejsDeleteRoute: "/delete/" + urlDynamicList,
            });
        }
    })
});

// ADDING TO DB
app.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.newItem
    });

    const listName = req.body.dynamicListName.toLowerCase();

    if (listName === "general to-do") {
        newItem.save(function () {
            res.redirect('/');
        });
    } else {
        DynamicList.findOne({ dynamicListName: listName }, function (err, foundList) {
            if (err) {
                console.log(err)
            } else if (foundList) {
                foundList.items.push(newItem);
                foundList.save(function () {
                    res.redirect("/" + listName);
                });
            }
        })
    }
});

// DELETING FROM DB
app.post("/delete", (req, res) => {
    checkedItem = JSON.parse(req.body.checkedItem);
    console.log(checkedItem.taskID + ", " + checkedItem.taskName);
    const dynamicListName = req.body.dynamicListName.toLowerCase();

    if (dynamicListName === "general to-do") {
        Item.findByIdAndRemove(checkedItem.taskID, function (err) {
            if (err) { console.log(err); }
            else {
                res.redirect("/");
            }
        });
    } else { //DYNAMIC PAGE
        DynamicList.findOne({ dynamicListName: dynamicListName }, function (err, foundList) {
            if (err) { console.log(err); }
            else if (foundList) {
                console.log(foundList);
                DynamicList.updateOne({ _id: foundList._id }, { $pull: { items: { _id: checkedItem.taskID } } }, function (err) {
                    res.redirect("/" + dynamicListName);
                });
            } else { console.log("Can't find list?"); }
        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});