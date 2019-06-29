//dependencies
var express = require("express");
var expresshbs = require('express-handlebars');
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();

// Require all models
var db = require("../models");

// Initialize Express
var app = express();

// Routes
router.get("/", function(req, res){
 res.render("index")
})

// A GET route for scraping the echoJS website
router.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.factcheck.org/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    var results = [];
    // Now, we grab every h2 within an article tag, and do the following:
    $("article h3").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });

      //send results to handlebars
        results.push(result);
    });
    res.render("index", results)
    // Send a message to the client
    // res.send("Scrape Complete");

     // var hbsObject = {
     //   user: data
     // };

    // res.render("index", hbsObject);



  });





  // res send back to handlebars


});

// Route for getting all Articles from the db
router.get("/articles", function(req, res) {
  //console.log("article hi");
  // Grab every document in the Article collection
  db.Article.find({})
    .then(function(dbArticle){
      //If we were able to successfully find Article, send this back to the client
      res.send(dbArticle);
    })
    .catch(function(err){
      //If error, send this to client
      res.json(err);
    })
});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that find the matching one in our db
  db.Article.findOne({_id: req.params.id})
  //populate all the notes
  .populate("note")
  .then(function(dbArticle) {
    //If successful, send this to client
    res.send(dbArticle);
  })
  .catch(function(err) {
    //If error send this to client
    res.json(err);
  })
});

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", function(req, res) {
  // Create a new note and pass through req.body
  db.Note.create(req.body)
    .then(function(dbNote) {
      //If successful find one Article with an id equal to params
      //{ new: true } tell the query that we want to return the updated User
      // Mongoose returns a promise
    return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._is}, {new:true});
    })
    .then(function(dbArticle) {
      //if successful return to client
      res.send(dbArticle);
    })
    .catch(function(err) {
      //If error return to client
      res.json(err);
    })
});


//export router to use in server
module.exports = router;
