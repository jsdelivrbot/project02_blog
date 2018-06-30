var express = require("express");
var app = express();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
// || "postgres://username goes here:password goes here@ server local host
// :5432/family history demo"

app.set("port", (process.env.PORT || 5000));

//This puts a placeholder :id app.get("/getPerson/:id", getPerson)
app.get("/getPerson", getPerson)

app.listen(app.get("port"), function() {
  console.log("Now listening for connections on port: ", app.get("port"));
});


function getPerson(req, res) {
  console.log("Getting person information.");

//var id = req.params.id; is used for placeholder
  var id = req.query.id;

  getPersonFromDb(id, function(error, result) {
   console.log("Back from database", result);
  });

  var result = {id: 238, first: "John", last: "Smith"};

  res.json(result);
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

//   client.query('SELECT id, first_name, last_name FROM member WHERE id = $1', [req.query.id], (dberr, dbres) => {
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

