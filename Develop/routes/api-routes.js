// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // This authentication process is required to confirm the user is in the SQL table, but is not required for the user signup
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function(req, res) {
    //This creates a new row in the user table with the email and password from the request
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
    // This will either redirect to login, or send an error if there is one
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  // This will log the user out of the system and redirect to the base page
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for returning data about the user
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // If the user is logged in, then send the email and id of the user 
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
