const express = require('express');
const mongoose = require("mongoose");
const req = require('express/lib/request');
const { forEach, first } = require('lodash');
const app = express();
const port = 3000
const _ = require("lodash");
const { homeStartingContent, aboutContent, contactContent } = require('./content');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://danielshaby:TBuCFs2esaUQgWDt@blogcluster.mmecz.mongodb.net/BlogDB?retryWrites=true&w=majority");
// Create Schemas
const postsSchema = {
  title: {
    type: String,
    required: [true, "Your post needs a title"]
  },
  body: {
    type: String,
    required: [true, "Your post needs a body"]
  }
}
// Create Model
const Post = mongoose.model("Post", postsSchema);

// Create Default Docs
const firstPost = new Post({
  title: "My first post!",
  body: "My first body!"
});

const secondPost = new Post({
  title: "My second post!",
  body: "My second body!"
});

const thirdPost = new Post({
  title: "My third Post",
  body: "My third body"
})

const defaultPosts = [firstPost, secondPost, thirdPost];

app.get('/', (req, res) => {
  Post.find({}, function (err, foundPosts) {
    if (foundPosts.length === 0) {
      Post.insertMany(defaultPosts, function (err) {
        if (err) { console.log(err); }
        else {
          console.log("Successfully inserted default posts into Post Model, foundPosts: " + foundPosts);
          foundPosts = defaultPosts;
        }
        res.redirect("/");
      })
    }
    else {
      res.render("home", {
        ejsHomeStartingContent: homeStartingContent,
        ejsPosts: foundPosts
      });
    }
  })
});

app.post('/', (req, res) => {
  const newPost = new Post({
    title: req.body.formTitle,
    body: req.body.formBody
  });

  newPost.save(function () {
    res.redirect("/");
  });
})

app.get("/about", (req, res) => {
  res.render("about", {
    ejsAboutContent: aboutContent
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    ejsContactContent: contactContent
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/posts/:topic", (req, res) => {
  const requestedTitle = _.kebabCase(req.params.topic);

  Post.find({}, function (err, foundPosts) {
    if (err) { console.log(err); }
    else {
      foundPosts.forEach((post) => {
        const postedTitle = _.kebabCase(post.title);
        if (postedTitle === requestedTitle) {
          res.render("post", {
            ejsPostTitle: post.title,
            ejsPostBody: post.body,
            ejsPostID: post._id
          });
        }
      });
    }
  });
})

app.get("/posts/id/:id", (req, res) => {
  const postID = req.params.id;

  Post.findById(postID, function (err, foundPostbyID) {
    res.render("post", {
      ejsPostTitle: foundPostbyID.title,
      ejsPostBody: foundPostbyID.body,
      ejsPostID: postID
    })
  })
})

app.post("/delete", (req, res) => {
  const deletedPost = req.body.deleteButton;
  Post.findByIdAndRemove(deletedPost, function (err, foundItem) {
    res.redirect("/");
  })
});

app.listen(port, () => {
  console.log('Example app listening on port: ' + port);
})