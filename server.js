const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getItems, getItem, deleteItem, addItem, updateItem, withdrawItem, depositItem } = require('./controller');
const { checkItem, checkWithdraw, checkDeposit } = require('./validators');
const port = process.env.PORT || 3000;

app = express();
app.use('/', express.static('dist'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.get('/items', getItems);
app.get('/items/:id', getItem);
app.delete('/items/:id', deleteItem);
app.post('/items', checkItem, addItem);
app.put('/items/:id', checkItem, updateItem);
app.put('/items/:id/withdraw', checkWithdraw, withdrawItem);
app.put('/items/:id/deposit', checkDeposit, depositItem);

//Connect to Server
app.listen(port, function () {
	console.log('Connected');
});
