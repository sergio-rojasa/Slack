const session = require('express-session')
const passport = require('passport')
const ObjectID = require('mongodb').ObjectID
const LocalStrategy = require('passport-local')

module.exports = function(app, db) {
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((email, done) => {
    done(null, email._id)
  })

  passport.deserializeUser((id, done) => {
    db.collection('emails').findOne(
      {_id: new ObjectID(id)},
      (err, doc) => {
        done(null, doc)
      }
    )
  })

  passport.use(new LocalStrategy(
      function(email, password, done) {
        db.collection('emails').findOne({ email: email }, function (err, email) {
          console.log('Email ' + email + ' attempted to log in.')
          if (err) { return done(err) }
          if (!email) { return done(null, false) }
          if (password !== email.password) { return done(null, false) }
          return done(null, email)
        })
      }
    ))
}
