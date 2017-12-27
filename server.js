const express    = require("express");
const bodyParser = require("body-parser");
const session    = require("express-session");
const mongo      = require("mongodb").MongoClient;
const routes     = require("./routes.js");
const auth       = require("./auth.js");
const app = express()

const http       = require("http").Server(app)

require("dotenv/config");


const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

mongo.connect(process.env.DATABASE, (err, db) => {
  if(err) {
    console.log('Database error: ' + err)
  }
  else {
    auth(app, db)
    routes(app, db)
    console.log('Successful database connection.')
    http.listen(process.env.PORT || 3000);
  }
})
