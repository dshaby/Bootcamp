require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
const port = 3000
//32 bytes
require('crypto').randomBytes(32, function (err, buffer) {
    var token = buffer.toString('base64');
});

//64 bytes
require('crypto').randomBytes(64, function (err, buffer) {
    var token = buffer.toString('base64');
});
const mongoosePasscode = process.env.mongoosePasscode;
mongoose.connect("mongodb+srv://danielshaby:" + mongoosePasscode + "@authcluster.yrmin.mongodb.net/AuthDB?retryWrites=true&w=majority");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "You need a 'username' "]
    },
    password: {
        type: String,
        required: [true, "This user needs a 'password' "]
    }
});
// const secret = "SOME_LONG_UNGUESSABLE_STRING";
const secret = process.env.SOME_LONG_UNGUESSABLE_STRING;
// const encKey = process.env.SOME_32BYTE_BASE64_STRING;
// const sigKey = process.env.SOME_64BYTE_BASE64_STRING;

userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });
// userSchema.plugin(encrypt.encryptedChildren);

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.render("home")
});

app.route("/login")
    .get((req, res) => {
        res.render("login", {
            errMessage: ""
        })
    })
    .post((req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({ email: username }, (err, foundUsername) => {
            if (foundUsername) {
                if (password === foundUsername.password) {
                    res.render("secrets");
                } else {
                    res.render("login", {
                        errMessage: "Password does not match username."
                    });
                }
            } else {
                console.log(err);
                res.render("login", {
                    errMessage: "Could not find this username/email address"
                });
            }
        });
    });

app.route("/register")
    .get((req, res) => {
        res.render("register");
    })
    .post((req, res) => {
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });
        newUser.save(function (err, results) {
            if (err) {
                console.log(err);
                res.redirect("/");
            }
            else {
                res.render("secrets");
                console.log(results);
            }
        });
    });

app.get("/submit", (req, res) => {
    res.render("submit");
});

app.listen(port, () => {
    console.log(`Secrets App listening on port ${port}`);
})