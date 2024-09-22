"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRoutes = require("./routes/api.js");
const fccTestingRoutes = require("./routes/fcctesting.js");
const runner = require("./test-runner");

db().catch((err) => console.log(err));

async function db() {
  await mongoose.connect(process.env.DB);
  console.log("connected to DB");

  const booksData = [
    {
      _id: "66f00fa3b8f094f74ee6b3c4",
      title: "Test Library",
      comments: ["first Test", "library", "test cs library"],
    },
    {
      _id: "66f0100b9624cfea9791daf1",
      title: "Comment update",
    },
  ];

  try {
    const createdBooks = await Books.create(booksData);
    console.log("Books created:", createdBooks);
  } catch (err) {
    console.error("Error creating books:", err);
  }

  startApp();
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  comments: {
    type: [String],
  },
});

const Books = mongoose.model("Books", bookSchema);

const app = express();

app.use("/public", express.static(process.cwd() + "/public"));

app.use(cors({ origin: "*" })); //USED FOR FCC TESTING PURPOSES ONLY!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app, Books);

//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

//Start our server and tests!
function startApp() {
  const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
    if (process.env.NODE_ENV === "test") {
      console.log("Running Tests...");
      setTimeout(function () {
        try {
          runner.run();
        } catch (e) {
          console.log("Tests are not valid:");
          console.error(e);
        }
      }, 1500);
    }
  });
}
module.exports = app; //for unit/functional testing