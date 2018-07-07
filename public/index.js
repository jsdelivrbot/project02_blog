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


//   })
// }


  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  .get('/handle_get_getPerson', (req, res) => handle_get_getPerson(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function handle_get_getPerson(req, res)
{
  console.log('We wuz here')

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  })

  client.connect()

  client.query('SELECT first_name, last_name FROM member WHERE id = $1', [req.query.id], (dberr, dbres) => {
    if (dberr) throw dberr
    for (let row of dbres.rows) {
      res.json(row)
      console.log(JSON.stringify(row))
    }
    client.end()
  })
}



// const express = require('express')
// const PORT = process.env.PORT || 5000

// const { Client } = require('pg')

// express()
//   .get('/handle_get_getPerson', (req, res) => handle_get_getPerson(req, res))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// function handle_get_getPerson(req, res)
// {
// 	console.log('We wuz here')

//   const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
//   })

//   client.connect()

//   client.query('SELECT first_name, last_name FROM member WHERE id = $1', [req.query.id], (dberr, dbres) => {
//     if (dberr) throw dberr
//     for (let row of dbres.rows) {
//       res.json(row)
//       console.log(JSON.stringify(row))
//     }
//     client.end()
//   })
// }


// var express = require('express');
// var app = express();


// // Following the "Single query" approach from: https://node-postgres.com/features/pooling#single-query

// const { Pool } = require("pg"); // This is the postgres database connection module.

// // This says to use the connection string from the environment variable, if it is there,
// // otherwise, it will use a connection string that refers to a local postgres DB
// const connectionString = process.env.DATABASE_URL, ssl: true

// // Establish a new connection to the data source specified the connection string.
// const pool = new Pool({connectionString: connectionString});


// app.set('port', (process.env.PORT || 5000));
// app.use(express.static(__dirname + '/public'));

// // This says that we want the function "getPerson" below to handle
// // any requests that come to the /getPerson endpoint
// app.get('/getPerson', function(request, response) {
//   getPerson(request, response);
// });

// // Start the server running
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });


// // This function handles requests to the /getPerson endpoint
// // it expects to have an id on the query string, such as: http://localhost:5000/getPerson?id=1
// function getPerson(request, response) {
//   // First get the person's id
//   var id = request.query.id;

//   // TODO: We should really check here for a valid id before continuing on...

//   // use a helper function to query the DB, and provide a callback for when it's done
//   getPersonFromDb(id, function(error, result) {
//     // This is the callback function that will be called when the DB is done.
//     // The job here is just to send it back.

//     // Make sure we got a row with the person, then prepare JSON to send back
//     if (error || result == null || result.length != 1) {
//       response.status(500).json({success: false, data: error});
//     } else {
//       var person = result[0];
//       response.status(200).json(result[0]);
//     }
//   });
// }

// // This function gets a person from the DB.
// // By separating this out from the handler above, we can keep our model
// // logic (this function) separate from our controller logic (the getPerson function)
// function getPersonFromDb(id, callback) {
//   console.log("Getting person from DB with id: " + id);

//   // Set up the SQL that we will use for our query. Note that we can make
//   // use of parameter placeholders just like with PHP's PDO.
//   var sql = "SELECT id, first, last FROM person WHERE id = $1::int";

//   // We now set up an array of all the parameters we will pass to fill the
//   // placeholder spots we left in the query.
//   var params = [id];

//   // This runs the query, and then calls the provided anonymous callback function
//   // with the results.
//   pool.query(sql, params, function(err, result) {
//     // If an error occurred...
//     if (err) {
//       console.log("Error in query: ")
//       console.log(err);
//       callback(err, null);
//     }

//     // Log this to the console for debugging purposes.
//     console.log("Found result: " + JSON.stringify(result.rows));


//     // When someone else called this function, they supplied the function
//     // they wanted called when we were all done. Call that function now
//     // and pass it the results.

//     // (The first parameter is the error variable, so we will pass null.)
//     callback(null, result.rows);
//   });

// } // end of getPersonFromDb


// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// function calculateRate(req, res) {
// 	var weight = Number(req.query.weight)
// 	var mail = Number(req.query.mail)
// 	var result = 0
// 	switch (req.query.mail)
// 	{
// 		case 'stamped':
// 			if (weight > 0 && weight <= 1) {
// 				result = '$0.50'
// 			} else if (weight > 1 && weight <= 2) {
// 				result = '$0.71'
// 			} else if (weight > 2 && weight <= 3) {
// 				result = '$0.92'
// 			} else if (weight > 3 && weight <= 3.5) {
// 				result = '$1.13'
// 			}else if (weight > 3.5) {
// 				result = "Weight exceeds limit for a stamped letters."
// 			}
// 			break
// 		case 'metered':
// 			if (weight > 0 && weight <= 1) {
// 				result = '$0.47'
// 			} else if (weight > 1 && weight <= 2) {
// 				result = '$0.68'
// 			} else if (weight > 2 && weight <= 3) {
// 				result = '$0.89'
// 			} else if (weight > 3 && weight <= 3.5) {
// 				result = '$1.10'
// 			}else if (weight > 3.5) {
// 				result = "Weight exceeds limit for a metered letters."
// 			}
// 			break
// 		case 'flats':
// 			if (weight > 0 && weight <= 1) {
// 				result = '$1.00'
// 			} else if (weight > 1 && weight <= 2) {
// 				result = '$1.21'
// 			} else if (weight > 2 && weight <= 3) {
// 				result = '$1.42'
// 			} else if (weight > 3 && weight <= 4) {
// 				result = '$1.63'
// 			} else if (weight > 4 && weight <= 5) {
// 				result = '$1.84'
// 			} else if (weight > 5 && weight <= 6) {
// 				result = '$2.05'
// 			} else if (weight > 6 && weight <= 7) {
// 				result = '$2.26'
// 			} else if (weight > 7 && weight <= 8) {
// 				result = '$2.47'
// 			} else if (weight > 8 && weight <= 9) {
// 				result = '$2.68'
// 			} else if (weight > 9 && weight <= 10) {
// 				result = '$2.89'
// 			} else if (weight > 10 && weight <= 11) {
// 				result = '$3.10'
// 			} else if (weight > 11 && weight <= 12) {
// 				result = '$3.31'
// 			} else if (weight > 12 && weight <= 13) {
// 				result = '$3.52'
// 			}else if (weight > 13) {
// 				result = "Weight exceeds limit for a Flat."
// 			}

// 			break
// 		case 'firstclasspackage':
// 			if (weight > 0 && weight <= 4) {
// 				result = '$3.50'
// 			} else if (weight > 4 && weight <= 8) {
// 				result = '$3.75'
// 			} else if (weight > 8 && weight <= 9) {
// 				result = '$4.10'
// 			} else if (weight > 9 && weight <= 10) {
// 				result = '$4.45'
// 			} else if (weight > 10 && weight <= 11) {
// 				result = '$4.80'
// 			} else if (weight > 11 && weight <= 12) {
// 				result = '$5.15'
// 			} else if (weight > 12 && weight <= 13) {
// 				result = '$5.50'
// 			} else if (weight > 13) {
// 				result = "Weight exceeds limit for a First Class Package."
// 			}
// 			break
// 	}
// 	return result
// }

// express()
// .use(express.static(path.join(__dirname, 'public')))
// .set('views', path.join(__dirname, 'views'))
// .set('view engine', 'ejs')
// .get('/', (req, res) => res.render('pages/index'))
// .get('/calculateresult', function (req, res) {
// 	res.render('pages/calculateresult', {
// 		weight: req.query.weight,
// 		mail: req.query.mail,
// 		theResult: calculateRate(req, res)

// 	})
// })

// .get('/postal_service', function(req, res) {
//   		res.json({
//   			weight: req.query.weight,
// 			mail: req.query.mail,
// 			theResult: calculateRate(req, res)
//   		})
//   	})
// .get('/getPerson', (req, res) => handle_get_getPerson(req, res))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))


//   function handle_get_getPerson(req, res)
//   {
//   	console.log('we wuz here');
//   }

