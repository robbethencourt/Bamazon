function bamazonCust() {

	// use mysql npm
	var mysql = require('mysql');

	// set connection for mysql
	var connection = mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'hihi',
		database: 'Bamazon'
	});

	// use inquirer npm
	var inquirer = require('inquirer');

	// connection to mysql server
	connection.query('SELECT * FROM Products', function(err, data) {

		// if error, throw error
		if (err) throw err;

		// display all the data to the screen
		console.log(data);
	});
	
}

bamazonCust();