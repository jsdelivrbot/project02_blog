const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

function doprocessing(req, res) {
	// console.log(req.query)
	var weight = Number(req.query.weight)
	var mail = Number(req.query.mail)
	var result = 0
	switch (req.query.mail)
	{
		case 'stamped':
			if (weight > 0 && weight <= 1) {
				result = '0.50'
			} else if (weight > 1 && weight <= 2) {
				result = '0.71'
			} else if (weight > 2 && weight <= 3) {
				result = '0.92'
			} else if (weight > 3 && weight <= 3.5) {
				result = '1.13'
			}
			break
		case 'metered':
			if (weight > 0 && weight <= 1) {
				result = '0.47'
			} else if (weight > 1 && weight <= 2) {
				result = '0.68'
			} else if (weight > 2 && weight <= 3) {
				result = '0.89'
			} else if (weight > 3 && weight <= 3.5) {
				result = '1.10'
			}
			break
		case 'flats':
			if (weight > 0 && weight <= 1) {
				result = '1.00'
			} else if (weight > 1 && weight <= 2) {
				result = '1.21'
			} else if (weight > 2 && weight <= 3) {
				result = '1.42'
			} else if (weight > 3 && weight <= 4) {
				result = '1.63'
			} else if (weight > 4 && weight <= 5) {
				result = '1.84'
			} else if (weight > 5 && weight <= 6) {
				result = '2.05'
			} else if (weight > 6 && weight <= 7) {
				result = '2.26'
			} else if (weight > 7 && weight <= 8) {
				result = '2.47'
			} else if (weight > 8 && weight <= 9) {
				result = '2.68'
			} else if (weight > 9 && weight <= 10) {
				result = '2.89'
			} else if (weight > 10 && weight <= 11) {
				result = '3.10'
			} else if (weight > 11 && weight <= 12) {
				result = '3.31'
			} else if (weight > 12 && weight <= 13) {
				result = '3.52'
			}

			break
		case 'firstclasspackage':
			if (weight > 0 && weight <= 4) {
				result = '3.50'
			} else if (weight > 4 && weight <= 8) {
				result = '3.75'
			} else if (weight > 8 && weight <= 9) {
				result = '4.10'
			} else if (weight > 9 && weight <= 10) {
				result = '4.45'
			} else if (weight > 10 && weight <= 11) {
				result = '4.80'
			} else if (weight > 11 && weight <= 12) {
				result = '5.15'
			} else if (weight > 12 && weight <= 13) {
				result = '5.50'
			} 
			break
	}
	// console.log('result is ', result)
	return result
}

express()
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))
.get('/calculateresult', function (req, res) {
	res.render('pages/calculateresult', {
		weight: req.query.weight,
		mail: req.query.mail,
		theResult: doprocessing(req, res)

	})
})

.get('/postal_service', function(req, res) {
  		res.json({
  			weight: req.query.weight,
			mail: req.query.mail,
			theResult: doprocessing(req, res)
  		})
  	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))