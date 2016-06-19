function bamazonManager() {
	
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

	function listActions() {
		
		prompt({
			name: 'action',
			type: 'list',
			message: 'What would you like to do?',
			choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
		// pass the selected action to .then()
		}).then(function(answer) {
			
			// switch statement to call the corresponding function
			switch(answer.action) {

				case 'View Products for Sale':

					viewProducts();
					break;

				case 'View Low Inventory':

					viewLowInventory();
					break;

				case 'Add to Inventory':

					addToInventory();
					break;

				case 'Add New Product':

					addNewProduct();
					break;

				default:

					listActions();

			} // end switch

		}); // and prompt().then()

	} // end listActions()

	function viewProducts() {
			
		// connection to mysql server
		connection.query('SELECT * FROM Products', function(err, data) {

			// if error, throw error
			if (err) throw err;

			// welcome screen and display all the items available to buy
			console.log('\nItems available for sale:\n');

			// loop through the list of items and display to the screen
			var i;
			var data_length = data.length;
			for (i = 0; i < data_length; i++) {

				// display the item ID, name of product and price
				console.log('  ' + data[i].ItemID + ' "' + data[i].ProductName + '" FORMAT: ' + data[i].DepartmentName + ' - PRICE: $' + data[i].Price + ' - Qty: ' + data[i].StockQuantity + '\n');

			} // end for loop

			// call the listActions() function so the user can select another action to perform
			listActions();
			
		}); // end connection.query()

	} // end viewProducts()

	function viewLowInventory() {
		
		// store query in a variable to pass to connection.query
		var query = 'SELECT * FROM Products WHERE StockQuantity < 5';

		// connection to mysql server
		connection.query(query, function(err, data) {

			// if error, throw error
			if (err) throw err;

			// welcome screen and display all the items with StockQuantity less than 5
			console.log('\nItems with quantity less than 5:\n');

			// loop through the list of items and display to the screen
			var i;
			var data_length = data.length;
			for (i = 0; i < data_length; i++) {

				// display the item ID, name of product and price
				console.log('  ' + data[i].ItemID + ' "' + data[i].ProductName + '" FORMAT: ' + data[i].DepartmentName + ' - PRICE: $' + data[i].Price + ' - Qty: ' + data[i].StockQuantity + '\n');

			} // end for loop

			// call the listActions() function so the user can select another action to perform
			listActions();
			
		}); // end connection.query()

	} // end viewLowInventory()

	function addToInventory() {
		
		// ask the user which product they would like to update
		prompt([{
			name: 'id',
			type: 'input',
			message: 'What is the ID of the Product you would like to update?',
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
		}, {
			name: 'amount',
			type: 'input',
			message: 'How many would you like to add?',
			validate: function(value) {

				// check if the user entered value is a number
				if (isNaN(value) == false) {

					// continues with the application
					return true;

				} else {

					// display error message and display the question again
					console.log('\n\nWe need a number for the amount.\n');
					return false;

				} // end if else

			}
		// pass the id and amount to the purchaseProduct function to update the quantity
		}]).then(function(answer) {

			// convert the answers to integers
			var item_int = parseInt(answer.id);
			var amount_int = parseInt(answer.amount);
			
			// store the query string into a variable to pass to connection.query()
    		var query = 'UPDATE Products SET StockQuantity = StockQuantity + ? WHERE ItemID = ?';

    		// update the Products table with the new StockQuantity for the purchased item
    		connection.query(query, [amount_int, item_int], function(err, data) {

    			// if error, throw error
				if (err) throw err;

				// display message stating quantity has been updated
				console.log('\nQuantity has been updated\n');

	    		// start the process over and list actions
	    		listActions();

    		}); // end connection.query()
		
		});  // end prompt().then()

	} // end addToInventory()

	function addNewProduct() {
		
		console.log('add new product');

	} // end addNewProduct()

	listActions();

} // end bamazonManager()

bamazonManager();