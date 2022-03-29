const express = require('express');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://danielshaby:TBuCFs2esaUQgWDt@blogcluster.mmecz.mongodb.net/BlogDB?retryWrites=true&w=majority")

const req = require('express/lib/request');
const { forEach } = require('lodash');
const app = express();
const port = 3000
const _ = require("lodash");
const { homeStartingContent, aboutContent, contactContent } = require('./content');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));


const posts = [];

app.get('/', (req, res) => {
  res.render("home", {
    ejsHomeStartingContent: homeStartingContent,
    ejsPosts: posts
  });
});

app.post('/', (req, res) => {
  const post = {
    title: req.body.formTitle,
    body: req.body.formBody
  }
  posts.push(post);
  res.redirect('/');
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

  posts.forEach((post) => {
    const postedTitle = _.kebabCase(post.title);
    if (requestedTitle === postedTitle) {
      res.render('post', {
        ejsPostTitle: post.title,
        ejsPostBody: post.body
      });
    }
  })
})

app.listen(port, () => {
  console.log('Example app listening on port: ' + port);
})