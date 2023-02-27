"use strict";
require("dotenv").config();
const express = require("express");
const myDB = require("./connection");
const fccTesting = require("./freeCodeCamp/fcctesting.js");

const passport = require("passport");
const session = require("express-session");

const app = express();

fccTesting(app); //For FCC testing purposes
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Working passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

passport.initialize();
passport.session();

//Integrate PUG
app.set("views", "./views/pug");
app.set("view engine", "pug");

app.route("/").get((req, res) => {
  res.render("index", { title: "Hello", message: "Please log in" });
});

// Create Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
