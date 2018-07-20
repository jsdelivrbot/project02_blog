const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const listRoutes = require('./api/routes/list');
const commentsRoutes = require('./api/routes/comments');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
		return res.status(200).json({});
	}
	next();
});


// Routes for handling request
app.use('/list', listRoutes);
app.use('/comments', commentsRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;