var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");
const { User } = db;

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({
      where: {
        username: username
      }
    }).then((user, err) => {
      console.log("promise after db query");
      if (err) {
        console.log("hello hello hello", err, user);
        return done(err);
      }
      if (!user) {
        console.log("user is not found");
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        console.log("invalid password");
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
