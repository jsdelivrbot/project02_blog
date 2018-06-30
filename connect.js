var express = require("express");
var app = express();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
// || "postgres://username goes here:password goes here@ server local host
// :5432/family history demo"

app.set("port", (process.env.PORT || 5000));

//This puts a placeholder :id app.get("/getPerson/:id", getPerson)
app.get("/getPerson", getPerson);
app.get("/getComment", getComment);
app.get("/getNewItem", getNewItem);
app.get("/getFinishedItem", getFinishedItem);

app.listen(app.get("port"), function() {
  console.log("Now listening for connections on port: ", app.get("port"));
});


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
 callback(null, [{
   id: id,
   first_name: 'John',
   last_name: 'Doe'
 }]);
}
// function getPersonFromDb(id, callback) {
//   console.log("getPersonFromDb called with id:", id);

//   var sql = "SELECT id, first_name, last_name FROM member WHERE id = $1::int";

//   var params = [id];

//   pool.query(sql, params, function(err, result) {
//       if (err) {
//         console.log("There was an error with the database.");
//         console.log(err);
//         callback(err, null);
//       }
//       console.log("Found DB result: " + JSON.stringify(result.rows));

//       callback(null, result.rows);
//   });
// }

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

  // var result = {id: 238, first: "John", last: "Smith"};

  // res.json(result);
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


// Below here is my attempt
// const express = require('express')
// const PORT = process.env.PORT || 5000

// const { Client } = require('pg')

// express()
//   .get('/handle_get_getPerson', (req, res) => handle_get_getPerson(req, res))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// function handle_get_getPerson(req, res)
// {
//   console.log('We wuz here')

//   const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
//   })

//   client.connect()

//   client.query('SELECT id, first_name, last_name FROM member WHERE id = $1::int', [req.query.id], (dberr, dbres) => {
//     if (dberr) throw dberr
//     for (let row of dbres.rows) {
//       //res.header('Content-Type', 'application/json');
//       res.json(row);
//       // res.write(res.json(dbres.rows));
//       //res.end();
//       //console.log(JSON.stringify(row))
//     }
//     client.end()
//   })
// }
