require('dotenv').config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
app.use(session({
    secret: process.env.SOME_LONG_UNGUESSABLE_STRING,
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
const port = 3000

// Mongoose
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoosePasscode = process.env.mongoosePasscode;
mongoose.connect("mongodb+srv://danielshaby:" + mongoosePasscode + "@authcluster.yrmin.mongodb.net/AuthDB?retryWrites=true&w=majority");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "You need a 'username' as defined in userSchema"]
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

// passport config
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.render("home")
});

app.route("/login")
    .get((req, res) => {
        res.render("login", {
            errMessage: "" || req.session.messages
        })
        req.session.messages = "";
    })
    .post(
        passport.authenticate("local", { failureRedirect: "/login", failureMessage: "Invalid username or password" }),
        (req, res) => {
            res.redirect("/secrets")
        }
    );

app.route("/register")
    .get((req, res) => {
        res.render("register");
    })
    .post((req, res) => {
        console.log("Registering new user");
        User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                console.log("Error while registering");
                res.redirect("/register");
            }
            else {
                passport.authenticate("local")(req, res, function () {
                    // Below will only be called if successfully authenticated
                    console.log("Successfully authenticated newly registered user");
                    res.redirect("/secrets");
                    console.log("req.isAuthenticated: " + req.isAuthenticated());
                });
            }
        });
    });

app.get("/logout", (req, res) => {
    req.logout();
    console.log("req.isAuthenticated: " + req.isAuthenticated());
    res.redirect('/');
});

app.get("/submit", (req, res) => {
    res.render("submit");
});

app.get("/secrets", (req, res) => {
    res.set("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stal e=0, post-check=0, pre-check=0");
    if (req.isAuthenticated()) {
        res.render("secrets");
    }
    else {
        res.redirect("/login");
        console.log("req.isAuthenticated: " + req.isAuthenticated());
    }
})

app.listen(port, () => {
    console.log(`Secrets App listening on port ${port}`);
})
// helllo@me.com
// cheers