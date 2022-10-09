// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();


/* Middleware*/


//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require("cors");

// Initialize the main project folder
const bodyparser = require("body-parser");
// Spin up the server
// Callback to debug
app.use(bodyparser.urlencoded({ extended:false}));
// Initialize all route with a callback function
app.use(bodyparser.json());
projectData = {};
app.use(express.static("website"));
// Callback function to complete GET '/all'
const getAll = ()
// Post Routeي