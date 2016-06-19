function bamazonCust() {

	// npm variable declarations

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
	// store the inquirer prompt in a variable as per the npm inquirer docs so we don't affect other libraries that also rely on inquirer when new prompt types are added or overwritten
	var prompt = inquirer.createPromptModule();


	// functions below

	// welcome the user and display products to the screen
	function displayProducts() {
		
		// connection to mysql server
		connection.query('SELECT * FROM Products', function(err, data) {

			// if error, throw error
			if (err) throw err;

			// welcome screen and display all the items available to buy
			console.log('\nWelcom to the Bamazon Cult Cinema Shop. Where you can purchase classic films in classic formats. \n');

			// loop through the list of items and display to the screen
			var i;
			var data_length = data.length;
			for (i = 0; i < data_length; i++) {

				// display the item ID, name of product and price
				console.log(data[i].ItemID + ' ' + data[i].ProductName + ' $' + data[i].Price + "\n");

			} // end for loop

			// call the selectProduct function here so that it's called once the products have been displayed
			selectProduct();
			
		}); // end connection.query()

	} // end displayProducts()

	// ask user which product they would like to buy
	function selectProduct() {
		
		// ask the user which product they would like to buy
		prompt({
			name: 'id',
			type: 'input',
			message: 'What is the ID of the Product you would like to buy?',
			validate: function(value) {

				// check if the user entered value is a number
				if (isNaN(value) == false) {

					// continues with the application
					return true;

				} else {

					// display error message and display the question again
					console.log('\n\nAll we need is the number next to the title.\n');
					return false;

				} // end if else

			}

		// 	
		}).then(function(answer) {
			console.log(answer);
		});

	} // end selectProduct()

	displayProducts();
	
}

bamazonCust();