const passport = require('passport')

module.exports = function(app, db) {
  app.route('/')
    .get(function(req, res) {
      res.sendFile(__dirname + '/views/index.html')
    })

  app.route("/login")
    .post(passport.authenticate("local", {
      failureRedirect: "/"
      }), function(req, res) {
        res.redirect("/profile");
    });
  app.route('/profile')
    .get(function(req, res) {
      res.sendFile(__dirname + '/views/profile.html')
    })
}
