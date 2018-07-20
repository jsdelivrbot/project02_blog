const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Getting list'
	});
});

router.post('/', (req, res, next) => {
	const new_item = {
		new_item: req.body.new_item
	};
	res.status(201).json({
		message: 'Posting list'
		// new_item: new_item
	});
});

router.get('/:listId', (req, res, next) => {
	const id = req.params.listId;
	if (id === 'special') {
		res.status(200).json({
			message: 'You got special Id',
			id: id
		})
	} else {
		res.status(200).json({
			message: 'You passed the ID'
		})
	}
});

router.patch('/:listId', (req, res, next) => {
	res.status(200).json({
		message: 'Updated List'
	});
});

router.delete('/:listId', (req, res, next) => {
	res.status(200).json({
		message: 'Delete from List'
	});
});

module.exports = router;