const express = require('express');
const res = require('express/lib/response');
const { default: mongoose } = require('mongoose');
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));

const dates = require('./dates');

// Creating mongoose DB
mongoose.connect("mongodb://localhost:27017/todolistDB");

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
    items: [toDoListSchema] // has same schema as traditional to-do-list
}

// Create models
const Item = mongoose.model("Item", toDoListSchema);
const DynamicList = mongoose.model("DynamicList", dynamicListSchema);

// Create & Save Default Docs
const listName = "general to-do"
function createDocs(listName) {
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
    console.log("Finished creating Docs, but not yet saved");

    if (listName === "general to-do") {
        Item.find({}, function (err, foundItems) {
            if (foundItems.length === 0) {
                Item.insertMany(defaultItems, function (err) {
                    if (err) { console.log(err); }
                    else {
                        console.log("Successfully insertedMany default items into the Item Model Database");
                    }
                });
                foundItems = defaultItems;
            };
        });
    } else {
        DynamicList.findOne({ dynamicListName: listName }, async function (err, foundList) {
            if (!foundList) {
                const newList = new DynamicList({
                    dynamicListName: listName,
                    items: defaultItems
                });

                newList.save(function () {
                    console.log("docs were saved!");
                });
            }
        })
    }
}

// HOME ROUTE
app.get('/', (req, res) => {
    Item.find({}, async function (err, foundItems) {
        if (foundItems.length === 0) {
            await addDocs(listName);
            res.redirect("/");
        } else {
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
    const urlDynamicList = req.params.listName;

    DynamicList.findOne({ dynamicListName: urlDynamicList }, function (err, foundList) {
        if (!foundList) {

            async function init() {
                await addDocs(urlDynamicList);
                res.redirect("/" + urlDynamicList);
                console.log("Redirecting");
            }

            function addDocs(urlDynamicList) {
                return new Promise((resolve, reject) => {
                    createDocs(urlDynamicList);
                    const error = false;

                    if (!error) {
                        resolve("Finished Creating docs?");
                    } else {
                        reject("Somethign went wrong");
                    }
                });
            }

            init();

        } else {
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            };
            console.log("Already loaded this page previously");
            res.render("index", {
                ejsListType: capitalizeFirstLetter(urlDynamicList),
                ejsWeekend: dates.weekend(),
                ejsTodaysDate: dates.todaysDate(),
                ejsToDoList: foundList.items,
                ejsDeleteRoute: "/delete/" + urlDynamicList,
            });
        }

        if (!foundList) {
            // createDocs(urlDynamicList);
            // res.redirect("/" + urlDynamicList);
        }
        else {
            // function capitalizeFirstLetter(string) {
            //     return string.charAt(0).toUpperCase() + string.slice(1);
            // };

            // res.render("index", {
            //     ejsListType: capitalizeFirstLetter(urlDynamicList),
            //     ejsWeekend: dates.weekend(),
            //     ejsTodaysDate: dates.todaysDate(),
            //     ejsToDoList: foundList.items,
            //     ejsDeleteRoute: "/delete/" + urlDynamicList,
            // });
        }
    });
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
    checkedItem = req.body.checkedItem;
    const dynamicListName = req.body.dynamicListName.toLowerCase();

    if (dynamicListName === "general to-do") {
        console.log("This is home Page, see dynamicListName: " + dynamicListName);
        Item.findByIdAndRemove(checkedItem, function (err) {
            if (err) { console.log(err); }
            else {
                console.log("Successfully deleted " + checkedItem);
                res.redirect("/");
            }
        });
    } else {
        console.log("This is dynamic Page, see dynamicListName: " + dynamicListName);
        DynamicList.findOne({ dynamicListName: dynamicListName }, function (err, foundList) {
            if (err) { console.log(err); }
            else if (foundList) {
                console.log("foundList.items b4 pop" + foundList.items);
                foundList.items.pop();
                console.log("foundList.items after pop" + foundList.items);

                DynamicList.updateOne({}, { $pull: { _id: checkedItem } }, function (err) {
                    console.log("Successfully deleted dynamic checkedItem's ID with $pull: " + checkedItem);
                    res.redirect("/" + dynamicListName);
                });
            } else { console.log("Can't find list?"); }
        });
    }
});


app.post("/delete/:listName", (req, res) => {
    urlDynamicList = req.params.listName;
    checkedItem = req.body.checkedItem;

    DynamicList.findByIdAndRemove(checkedItem, function (err, foundItems) {
        if (err) { console.log(err); }
        else {
            console.log("checkedItem: " + checkedItem);
            console.log("Successfully deleted " + checkedItem);

            console.log(foundItems);

            res.redirect("/" + urlDynamicList);
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});