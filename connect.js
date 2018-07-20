const http = require('http');
const app = require('./app');
// var path = require('path');
// var express = require('express');
// var app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
// var addToList = require('addToList.js')

// We are going to use sessions
//var parseurl = require('parseurl')
// var session = require('express-session')

// app.use((req, res, next) => {
//   res.status(200).json({
//     message: "Connected!"
//   });
// });

//module.exports = app;

// set up sessions
// app.use(session({
//   secret: 'my-super-secret-secret!',
//   resave: false,
//   saveUninitialized: true
// }))

// // Because we will be using post values, we need to include the body parser module
// var bodyParser = require('body-parser')
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));

// app.set('port', (process.env.PORT || 5000));

// // We have html and js in the public directory that need to be accessed
// app.use(express.static(path.join(__dirname, 'public')))

// // Setup our routes
// app.post('/storeComment', addTheComment);
// app.post('/login', handleLogin);
// app.post('/logout', handleLogout);
// //write functions for these
// app.post('/additem', addItemToDb);
// app.get('/getPerson', getPersonFromDb);
// app.get('/getComment', getPersonFromDb);
// app.get('/getNewItem', getNewItemFromDb);
// app.get('/getFinishedItem', getNewItemFromDb);


// // This method has a middleware function "verifyLogin" that will be called first
// app.get('/getServerTime', verifyLogin, getServerTime);

// // Start the server
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });



