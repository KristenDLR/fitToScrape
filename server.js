var express = require("express");
var exphbs = require('express-handlebars');
var logger = require("morgan");
var mongoose = require("mongoose");
var favicon = require('serve-favicon')

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

var router = express.Router();

//favicon
// app.use(favicon(path.join(__dirname, 'public', 'img','favicon_io', 'favicon.ico')))

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();
// Register Handlebars view engine
// app.engine('handlebars', exphbs());
// Use Handlebars view engine
// app.set('view engine', 'handlebars');

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// nodemon: DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
// mongoose.connect(db, { useNewUrlParser: true }, function(error) {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log("mongoose connection successful");
//   }
// });

// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
var router = require("./config/router");
app.use(router);


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
