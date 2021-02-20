// API endpoint
let projectData = [];
// const fakeData = { test: "testing" };

const express = require("express");
const app = express();

// including middlewear
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up server
const port = 8000;
app.listen(port, () => {
  console.log(`Running on localhost: ${port}`);
});
app.use(express.static("website"));

// GET route which returns the API endpoint
app.get("/all", (req, res) => {
  // console.log("/all", req.body);
  res.send(projectData);
  console.log("/all", projectData);
});

// POST route which adds incoming data to API endpoint
app.post("/addData", (req, res) => {
  // console.log("addData", req.body);
  newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };
  projectData = newEntry;
  res.send(projectData);
});
