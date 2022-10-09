const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const port = 8000;

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});

let newSearchWeather = {};

app.get("/all", (_req, res) => {
  res.send(newSearchWeather);
});

app.post("/addData", (req, res) => {
  newSearchWeather.temp = req.body.temp;
  newSearchWeather.date = req.body.date;
  newSearchWeather.feeling = req.body.feeling;
  res.send(newSearchWeather);
});
