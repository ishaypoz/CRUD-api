const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Inventory Object
let items = [];

//GET Items List
app.get('/items', function (req, res) {
	return res.status(200).json(items);
});

//GET Item
app.get('/items/:id', function (req, res) {
	if (items[req.params.id]) {
		return res.status(200).json(items[req.params.id]);
	} else {
		res.status(404).json({});
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
				id: items.length,
				name: req.body.name,
				description: req.body.description,
				count: req.body.count
			};
			items.push(data);
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
		if (!errors.isEmpty()) {
			console.log(errors);
			return res.status(406).json('Not Acceptable');
		} else {
			let data = {
				id: req.params.id,
				name: req.body.name,
				description: req.body.description,
				count: req.body.count
			};
			items[req.params.id] = data;
			return res.status(200).json('Updated');
		}
	}
);

//Delete Item
app.delete('/items/:id', function (req, res) {
	let index = items.findIndex((x) => x.id === req.params.id);
	items.splice(index, 1);
	return res.status(200).json('Deleted');
});

//Connect to Server
app.listen(3000, function () {
	console.log('Connected');
});
