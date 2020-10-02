const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

app = express();
app.use('/', express.static('dist'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Inventory Object
let items = [];
let id = 1;

//GET Items List
app.get('/items', function (req, res) {
	return res.status(200).json(items);
});

//GET Item
app.get('/items/:id', function (req, res) {
	let index = items.findIndex((x) => x.id == req.params.id);
	if (index !== -1) {
		return res.status(200).json(items[index]);
	} else {
		res.status(404).json({});
	}
});

//Delete Item
app.delete('/items/:id', function (req, res) {
	let index = items.findIndex((x) => x.id == req.params.id);
	if (index !== -1) {
		items.splice(index, 1);
		return res.status(200).json('Deleted');
	} else {
		return res.status(404).json('Unfound');
	}
});

//POST Item
app.post(
	'/items',
	[check('name').isLength({ min: 2 }), check('description').notEmpty(), check('count').isInt({ min: 0 })],
	function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(406).json('Not Acceptable');
		} else {
			let data = {
				id: id,
				name: req.body.name,
				description: req.body.description,
				count: req.body.count
			};
			items.push(data);
			id++;
			return res.status(201).json('Created');
		}
	}
);

//PUT Item
app.put(
	'/items/:id',
	[check('name').isLength({ min: 3 }), check('description').notEmpty(), check('count').isInt({ min: 0 })],
	function (req, res) {
		const errors = validationResult(req);
		let index = items.findIndex((x) => x.id == req.params.id);
		if (!errors.isEmpty() || index === -1) {
			console.log(errors);
			return res.status(406).json('Not Acceptable');
		} else {
			let data = {
				id: req.params.id,
				name: req.body.name,
				description: req.body.description,
				count: req.body.count
			};
			items[index] = data;
			return res.status(200).json('Updated');
		}
	}
);

//PUT withdraw item count
app.put('/items/:id/withdraw', [check('withdraw').isInt({ min: 0 })], function (req, res) {
	const errors = validationResult(req);
	let index = items.findIndex((x) => x.id == req.params.id);
	if (!errors.isEmpty() || index === -1) {
		console.log(errors);
		return res.status(406).json('Not Acceptable');
	} else {
		if (items[index].count - req.body.withdraw < 0) {
			return res.status(406).json('Out of Balance');
		} else {
			items[index] = { ...items[index], count: items[index].count - req.body.withdraw };
			return res.status(200).json('Updated');
		}
	}
});

//PUT deposit item count
app.put('/items/:id/deposit', [check('deposit').isInt({ min: 0 })], function (req, res) {
	const errors = validationResult(req);
	let index = items.findIndex((x) => x.id == req.params.id);
	if (!errors.isEmpty() || index === -1) {
		console.log(errors);
		return res.status(406).json('Not Acceptable');
	} else {
		items[index] = { ...items[index], count: items[index].count + req.body.deposit };
		return res.status(200).json('Updated');
	}
});

//Connect to Server
app.listen(3000, function () {
	console.log('Connected');
});
