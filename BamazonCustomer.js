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
		prompt([{
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
		}, {
			name: 'amount',
			type: 'input',
			message: 'How many would you like to buy?',
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
		// pass the id and amount to the purchaseProduct function to complete the transaction
		}]).then(function(answer) {

			purchaseProduct(answer);
		
		});

	} // end selectProduct()

	// check the inventory and purchase the product with the itemID and amount to purchase passed as selected_item
	function purchaseProduct(selected_item) {

		selected_item_int = parseInt(selected_item.amount);
		
		// store the query into a variable to pass to connection.query()
		var query_select = 'SELECT * FROM Products WHERE ?';

		// run the query to match the selected id to what's in the database
        connection.query(query_select, {ItemID: selected_item.id}, function(err, data_select) {
            
        	if (data_select[0].StockQuantity < selected_item_int) {

        		console.log('\nSorry for the inconveniance, but you selected to purchase more than we have in stock. Please look over our products and make another selection.\n');

        		// start the process over
        		selectProduct();

        	} else {

        		var query_update = 'UPDATE Products SET StockQuantity = ? WHERE ItemID = ?';
        		var new_quantity = data_select[0].StockQuantity - selected_item_int;

        		connection.query(query_update, [new_quantity, data_select[0].ItemID], function(err, data_update) {
        			
        			console.log(data_update);

        		}); // end connection.query()

        		console.log('Thank you for your purchase. Total price is $' + data_select[0].Price * selected_item_int);

        		// start the process over
        		selectProduct();

        	} // enf if else

        }); // end connection.query()

	} // end purchaseProduct()

	displayProducts();
	
}

bamazonCust();