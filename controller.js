const { validationResult } = require('express-validator');
const { logger } = require('./logConfig');
let { items, id } = require('./service');

//GET Items List
exports.getItems = function (req, res) {
	return res.status(200).json(items);
};

//GET Item
exports.getItem = function (req, res) {
	let index = items.findIndex((x) => x.id == req.params.id);
	if (index !== -1) {
		return res.status(200).json(items[index]);
	} else {
		res.status(404).json('Sorry, Item Was Not Found.');
	}
};

//Delete Item
exports.deleteItem = function (req, res) {
	let index = items.findIndex((x) => x.id == req.params.id);
	if (index !== -1) {
		items.splice(index, 1);
		return res.status(200).json(`Item With ID: ${req.params.id} Was Deleted`);
	} else {
		return res.status(404).json('Sorry, Item Was Not Found.');
	}
};

//POST Item
exports.addItem = function (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		logger.info(errors);
		return res
			.status(406)
			.json(
				'Please Check Input: Item Name: most be longer then 3 character, Item Description most be valid, Item Count most be integer bigger or equal to 0'
			);
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
};

//PUT Item
exports.updateItem = function (req, res) {
	const errors = validationResult(req);
	let index = items.findIndex((x) => x.id == req.params.id);
	if (index === -1) {
		return res.status(404).json('Sorry, Item Was Not Found.');
	}
	if (!errors.isEmpty()) {
		logger.info(errors);
		return res
			.status(406)
			.json(
				'Please Check Input: Item Name: most be longer then 3 character, Item Description most be valid, Item Count most be integer bigger or equal to 0'
			);
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
};

//PUT withdraw item count
exports.withdrawItem = function (req, res) {
	const errors = validationResult(req);
	let index = items.findIndex((x) => x.id == req.params.id);
	if (index === -1) {
		return res.status(404).json('Sorry, Item Was Not Found.');
	}
	if (!errors.isEmpty()) {
		logger.info(errors);
		return res.status(406).json('Most Be Positive Integer');
	} else {
		if (items[index].count - req.body.withdraw < 0) {
			return res.status(406).json('Out of Quantity');
		} else {
			items[index] = { ...items[index], count: items[index].count - req.body.withdraw };
			return res.status(200).json('Updated');
		}
	}
};

//PUT deposit item count
exports.depositItem = function (req, res) {
	const errors = validationResult(req);
	let index = items.findIndex((x) => x.id == req.params.id);
	if (index === -1) {
		return res.status(404).json('Sorry, Item Was Not Found.');
	}
	if (!errors.isEmpty()) {
		logger.info(errors);
		return res.status(406).json('Most Be Positive Integer');
	} else {
		items[index] = { ...items[index], count: items[index].count + req.body.deposit };
		return res.status(200).json('Updated');
	}
};
