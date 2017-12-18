const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const routes = require('./routes.js')
const auth = require('./auth.js')

const app = express()
const port = process.env.PORT || 3002

app.use(express.static(__dirname + '/public'))
app.use(bodyParser())

auth(app)
routes(app)

app.listen(port, function() {
  console.log('Node is listening on http://localhost:' + port)
})
