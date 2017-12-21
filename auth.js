const session = require('express-session')
const passport = require('passport')
const ObjectID = require('mongodb').ObjectID

module.exports = function(app) {
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    db.collection('emails').findOne(
      {_id: new ObjectID(id)},
      (err, doc) => {
        done(null, doc)
      }
    )
  })


}
