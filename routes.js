module.exports = function(app) {
  app.route('/')
    .get(function(req, res) {
      res.sendFile(__dirname + '/views/index.html')
    })
}
