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
    .get(ensureAuthenticated, (req, res) => {
      res.sendFile(__dirname + '/views/profile.html')
    })

  app.route('/logout')
    .get((req, res) => {
      req.logout()
      req.redirect('/')
    })

  app.use((req, res, next) => {
    res.status(404)
    .type('text')
    .send('Not Found')
  })

  function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/');
 };
}
