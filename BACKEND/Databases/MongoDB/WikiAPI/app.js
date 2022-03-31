const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://danielshaby:TBuCFs2esaUQgWDt@blogcluster.mmecz.mongodb.net/WikiDB?retryWrites=true&w=majority")
// Create Schema
const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Your WikiArticle doesn't have a title!"]
    },
    content: {
        type: String,
        required: [true, "Your WikiArticle needs Content!!"]
    }
});
const Article = new mongoose.model("Article", ArticleSchema);

//////////////////////// REQUESTS TARGETING ALL ARTICLES////////////////////////
app.route("/articles")
    .get((req, res) => {
        Article.find({}, function (err, results) {
            if (err) { console.log(err); }
            else { res.send(results); }
        });
    })
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (err) { console.log(err); }
            else { res.redirect("/articles/"); }
        });
    })
    .delete((req, res) => {
        Article.deleteMany({}, function (err, deletedItems) {
            if (err) { console.log(err); }
            else {
                res.send("Successfully deleted all articles");
            }
        });
    });
//////////////////////// REQUESTS TARGETING SPECIFIC ARTICLES////////////////////////
app.route("/articles/:articleTitle")
    .get((req, res) => {
        Article.findOne({ title: req.params.articleTitle }, (err, articleFound) => {
            if (articleFound) { res.send(articleFound) }
            else { res.send("No article found"); }
        });
    })
    .put((req, res) => {
        Article.replaceOne({ title: req.params.articleTitle }, //to be replaced
            { title: req.body.title, content: req.body.content }, //replacing with
            function (err, updatedArticle) { //callback
                if (updatedArticle) { res.send(updatedArticle) }
                else { res.send("Article wasn't updated") }
            });
    })
    .patch((req, res) => {
        Article.updateOne({ title: req.params.articleTitle },
            { $set: req.body },
            (err, results) => {
                if (err) { res.send(err); }
                else { res.send(results); }
            })
    })
    .delete((req, res) => {
        Article.deleteOne({ title: req.params.articleTitle }, (err, results) => {
            res.send(err || results);
        })
    });





app.listen(port, () => {
    console.log(`This app is listening on port ${port}`)
});