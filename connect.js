const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
const session = require('express-session');
const { Client } = require('pg')
var app = express();


const addToList = require('./addToList.js');

  app.use(express.static(path.join(__dirname, 'public')))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
  secret: 'this-is-my-secret',
  resave: false,
  saveUninitialized: true
}))
  app.use('/addToList', addToList.getRoute())
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
