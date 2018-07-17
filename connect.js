var path = require('path');
var express = require('express');
var app = express();

// We are going to use sessions
//var parseurl = require('parseurl')
var session = require('express-session')

// set up sessions
app.use(session({
  secret: 'my-super-secret-secret!',
  resave: false,
  saveUninitialized: true
}))

// Because we will be using post values, we need to include the body parser module
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('port', (process.env.PORT || 5000));

// We have html and js in the public directory that need to be accessed
app.use(express.static(path.join(__dirname, 'public')))

// This shows how to use a middleware function for all requests (it is defined below)
// Becuse it comes after the static function call, we won't see it log requests
// for the static pages, only the ones that continue on passed that (e.g., /logout)
app.use(logRequest);

// Setup our routes
app.post('/storeComment', addTheComment);
app.post('/login', handleLogin);
app.post('/logout', handleLogout);
//write functions for these
app.post('/additem', addItemToDb);
app.get('/getPerson', getPersonFromDb);
app.get('/getComment', getPersonFromDb);
app.get('/getNewItem', getNewItemFromDb);
app.get('/getFinishedItem', getNewItemFromDb);


// This method has a middleware function "verifyLogin" that will be called first
app.get('/getServerTime', verifyLogin, getServerTime);

// Start the server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



/****************************************************************
 * These methods should likely be moved into a different module
 * But they are hear for ease in looking at the code
 ****************************************************************/
//Handle the comments into the database
function addTheComment(req, res) {
  console.log('saving comment: ');

  var sql = 'INSERT INTO comments(comments) VALUES ($1)';

  var params = [req.comments];

  dbconnect.query(sql, params, function(error, result) {
    if (error) {
      console.log('A DB error occured');
      console.log(error);
    }

    console.log('Inserted into DB');

    //callback(null, vip.js/1);
  });
}


// Checks if the username and password match a hardcoded set
// If they do, put the username on the session
function handleLogin(request, response) {
  var result = {success: false};

  // We should do better error checking here to make sure the parameters are present
  if (request.body.username == "admin" && request.body.password == "password") {
    request.session.user = request.body.username;
    result = {success: true};
  }

  response.json(result);
}

// If a user is currently stored on the session, removes it
function handleLogout(request, response) {
  var result = {success: false};

  // We should do better error checking here to make sure the parameters are present
  if (request.session.user) {
    request.session.destroy();
    result = {success: true};
  }

  response.json(result);
}

// This function returns the current server time
function getServerTime(request, response) {
  var time = new Date();
  
  var result = {success: true, time: time};
  response.json(result); 
}

// This is a middleware function that we can use with any request
// to make sure the user is logged in.
function verifyLogin(request, response, next) {
  if (request.session.user) {
    // They are logged in!

    // pass things along to the next function
    next();
  } else {
    // They are not logged in
    // Send back an unauthorized status
    var result = {succes:false, message: "Access Denied"};
    response.status(401).json(result);
  }
}

// This middleware function simply logs the current request to the server
function logRequest(request, response, next) {
  console.log("Received a request for: " + request.url);

  // don't forget to call next() to allow the next parts of the pipeline to function
  next();
}

// adding my other functions here
  function getPerson(req, res) {
  console.log("Getting person information.");

//var id = req.params.id; is used for placeholder
  var id = req.query.id;

  getPersonFromDb(id, function(error, result) {

    if (error || result == null || result.length != 1) {
      res.status(500).json({success:false, data: error});
    } else {
      res.json(result[0]);
    } 

   console.log("Back from database", result);
   res.json(result);
  });

  // var result = {id: 238, first: "John", last: "Smith"};

  // res.json(result);
}

function getPersonFromDb(id, callback) {
  console.log("getPersonFromDb called with id:", id);

  var sql = "SELECT id, first_name, last_name FROM member WHERE id = $1::int";

  var params = [id];

  pool.query(sql, params, function(err, result) {
      if (err) {
        console.log("There was an error with the database.");
        console.log(err);
        callback(err, null);
      }
      console.log("Found DB result: " + JSON.stringify(result.rows));

      callback(null, result.rows);
  });
}

function addItemToDb(addItem, callback) {
  console.log('saving comment: ', addItemToDb);

  var sql = 'INSERT INTO list(new_item) VALUES (?)';

  var params = [addComment.comments];

  dbconnect.query(sql, params, function(error, result) {
    if (error) {
      console.log('A DB error occured');
      console.log(error);
    }

    console.log('Inserted into DB');

    //callback(null, vip.js/1);
  });
}

function getComment(req, res) {
  console.log("Getting Comments.");

  var id = req.query.id;

  getCommentFromDb(id, function(error, result) {

    if (error || result == null || result.length != 1) {
      res.status(500).json({success:false, data: error});
    } else {
      res.json(result[0]);
    } 

   console.log("Back from database", result);
   res.json(result);
  });
}

function getCommentFromDb(id, callback) {
  console.log("getCommentFromDb called with id:", id);

  var sql = "SELECT comment_id, comments FROM comments WHERE id = $1::int AND comments = $2text";

  var params = [id];

  pool.query(sql, params, function(err, result) {
      if (err) {
        console.log("There was an error with the database.");
        console.log(err);
        callback(err, null);
      }
      console.log("Found DB result: " + JSON.stringify(result.rows));

      callback(null, result.rows);
  });
}

function getNewItem(req, res) {
  console.log("Getting New information.");

//var id = req.params.id; is used for placeholder
  var id = req.query.id;

  getNewItemFromDb(id, function(error, result) {

    if (error || result == null || result.length != 1) {
      res.status(500).json({success:false, data: error});
    } else {
      res.json(result[0]);
    } 

   console.log("Back from database", result);
   res.json(result);
  });

}

function getNewItemFromDb(id, callback) {
  console.log("getNewItemFromDb called with id:", id);

  var sql = "SELECT id, new_item FROM list WHERE id = $1::int AND new_item = $2::text";

  var params = [id];

  pool.query(sql, params, function(err, result) {
      if (err) {
        console.log("There was an error with the database.");
        console.log(err);
        callback(err, null);
      }
      console.log("Found DB result: " + JSON.stringify(result.rows));

      callback(null, result.rows);
  });
}

function getFinishedItem(req, res) {
  console.log("Getting Finished information.");

//var id = req.params.id; is used for placeholder
  var id = req.query.id;

  getFinishedItemFromDb(id, function(error, result) {

    if (error || result == null || result.length != 1) {
      res.status(500).json({success:false, data: error});
    } else {
      res.json(result[0]);
    } 

   console.log("Back from database", result);
   res.json(result);
  });

  
}

function getFinishedItemFromDb(id, callback) {
  console.log("getFinishedItemFromDb called with id:", id);

  var sql = "SELECT id, finished_item FROM list WHERE id = $1::int AND finished_item = $2::text";

  var params = [id];

  pool.query(sql, params, function(err, result) {
      if (err) {
        console.log("There was an error with the database.");
        console.log(err);
        callback(err, null);
      }
      console.log("Found DB result: " + JSON.stringify(result.rows));

      callback(null, result.rows);
  });
}

function storeComment(addComment, callback) {
  console.log('saving comment: ', addComment);

  var sql = 'INSERT INTO comments(comments) VALUES ($1)';

  var params = [addComment.comments];

  dbconnect.query(sql, params, function(error, result) {
    if (error) {
      console.log('A DB error occured');
      console.log(error);
    }

    console.log('Inserted into DB');

    //callback(null, vip.js/1);
  });
}
