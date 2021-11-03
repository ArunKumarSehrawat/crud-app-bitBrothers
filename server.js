"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static(__dirname + "/src"));
app.set("view engine", "ejs");

// simulates a database
let users = [
     {
          name: "arun",
          username: "desiassassin",
          password: "bruhh",
     },
     {
          name: "jason",
          username: "jasonbrody",
          password: "citra",
     },
     {
          name: "vaas",
          username: "pyscho",
          password: "acting",
     },
     {
          name: "price",
          username: "cptprice",
          password: "makarov",
     },
     {
          name: "soap",
          username: "mactavish",
          password: "mohawk",
     },
];

app.get("/", (req, res) => {
     res.render("index");
});

// CREATE - creates a user
app.get("/createUser", (req, res) => {
     res.render("create");
});
app.post("/createUser", (req, res) => {
     const { name, username, password } = req.body;
     users.forEach((user) => {
          if (user.name === name) {
               res.render("create", { error: true });
          }
     });
     users.push({ name, username, password });
     res.redirect("/");
});

// READ - sends all users or specific user
app.get("/readUser", (req, res) => {
     const { name } = req.query;
     if (name) {
          users.forEach((user) => {
               if (user.name === name) res.render("read", { users: [user] });
          });
          res.render("read", { users: [], error: true });
     } else res.render("read", { users: users });
});

// UPDATE - update an user
app.get("/updateUser", (req, res) => {
     const { name } = req.query;
     if (name) res.render("update", { username: name });
     else res.render("update");
});
app.post("/updateUser", (req, res) => {
     const { nameToUpdate, uname, uusername } = req.body;
     if (nameToUpdate) {
          users.forEach((user) => {
               if (user.name === nameToUpdate) {
                    user.name = uname;
                    user.username = uusername;
                    res.redirect("/readUser");
               }
          });
          res.render("update", { error: true });
     } else res.render("update", { error: true });
});

// DELETE - delete a user
app.get("/deleteUser", (req, res) => {
     res.render("delete");
});
app.post("/deleteUser", (req, res) => {
     const { nameToDelete } = req.body;
     users.forEach((user, index) => {
          if (user.name === nameToDelete) {
               users.splice(index, 1);
               res.redirect("/readUser");
          }
     });
});

app.listen(3000, () => {
     console.log("Server running on localhost:3000");
});
