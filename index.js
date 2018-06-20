const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

function doprocessing(req, res) {
	// console.log(req.query)
	var operand1 = Number(req.query.operand1)
	var operand2 = Number(req.query.operand2)
	var result = 0
	switch (req.query.operation)
	{
		case 'add':
			result = operand1 + operand2
			break
		case 'subtract':
			result = operand1 - operand2
			break
		case 'multiply':
			result = operand1 * operand2
			break
		case 'divide':
			result = operand1 / operand2
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
  .get('/math', function(req, res) {
  		res.render('pages/math', {
  			theOperation: req.query.operation,
  			theOperand1: req.query.operand1,
  			theOperand2: req.query.operand2,
  			theResult: doprocessing(req, res)
  		})
  	})
  .get('/math_service', function(req, res) {
  		res.json({
  			theOperation: req.query.operation,
  			theOperand1: req.query.operand1,
  			theOperand2: req.query.operand2,
  			theResult: doprocessing(req, res)
  		})
  	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
