const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Getting comment'
	});
});

router.post('/', (req, res, next) => {
	const comment = {
		comments: req.body.comments
	};
	res.status(201).json({
		message: 'Posting comment',
		comments: comment
	});
});

router.get('/:commentId', (req, res, next) => {
		res.status(200).json({
			message: 'Your comment',
			commentId: req.params.commentId
		});
});

router.patch('/:commentId', (req, res, next) => {
	res.status(200).json({
		message: 'Updated Comment',
		commentId: req.params.commentId
	});
});

router.delete('/:commentId', (req, res, next) => {
	res.status(200).json({
		message: 'Delete from Comment',
		commentId: req.params.commentId
	});
});

module.exports = router;