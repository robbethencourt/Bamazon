var mysql = require('mysql');

// set connection for mysql
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'hihi',
	database: 'Bamazon'
});

exports.connection = connection;