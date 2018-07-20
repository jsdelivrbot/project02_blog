const http = require('http');
const app = require('./app');
var path = require('path');

const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);



// // This method has a middleware function "verifyLogin" that will be called first
// app.get('/getServerTime', verifyLogin, getServerTime);

// Start the server
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });



