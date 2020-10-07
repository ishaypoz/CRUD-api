const { check } = require('express-validator');
//Validate API inputs
exports.checkItem = [
	check('name').isLength({ min: 3 }),
	check('description').notEmpty(),
	check('count').isInt({ min: 0 })
];
exports.checkWithdraw = [check('withdraw').isInt({ min: 0 })];
exports.checkDeposit = [check('deposit').isInt({ min: 0 })];
