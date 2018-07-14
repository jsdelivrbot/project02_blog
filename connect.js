const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
const session = require('express-session');
var app = express();




// const express = require('express');
// const path = require('path');
// var app = express();
// const { Client } = require('pg')

// var session = require('express-session');

// app.use(session({
//   secret: 'my-super-secret-secret!',
//   resave: false,
//   saveUninitialized: true
// }))

// var bodyParser = require('body-parser')
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));

// app.set('port', (process.env.PORT || 5000));

// app.use(express.static(path.join(__dirname, 'public')));

// app.use(logRequest);

// // Setting up the routes
// app.post('/login', handleLogin);
// app.post('/logout', handleLogout);

// app.get('/getServerTime', verifyLogin, getServerTime);

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

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
