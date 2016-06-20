function bamazonCust() {

	// npm variable declarations

	// use mysql npm through the mysqlconnect.js file
	var connect = require('./mysqlconnect.js');

	// use inquirer npm
	var inquirer = require('inquirer');
	// store the inquirer prompt in a variable as per the npm inquirer docs so we don't affect other libraries that also rely on inquirer when new prompt types are added or overwritten
	var prompt = inquirer.createPromptModule();


	// functions below

	// welcome the user and display products to the screen
	function displayProducts() {
		
		// connection to mysql server
		connect.connection.query('SELECT * FROM Products', function(err, data) {

			// if error, throw error
			if (err) throw err;

			// welcome screen and display all the items available to buy
			console.log('\nWelcom to the Bamazon Cult Cinema Shop. Where you can purchase classic films in classic formats. \n');

			// loop through the list of items and display to the screen
			var i;
			var data_length = data.length;
			for (i = 0; i < data_length; i++) {

				// display the item ID, name of product and price
				console.log('  ' + data[i].ItemID + ' "' + data[i].ProductName + '" FORMAT: ' + data[i].DepartmentName + ' - PRICE: $' + data[i].Price + ' - Qty: ' + data[i].StockQuantity + '\n');

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

			// call the purchaseProduct() function and pass the two user inputed values
			purchaseProduct(answer);
		
		});  // end prompt().then()

	} // end selectProduct()

	// check the inventory and purchase the product with the itemID and amount to purchase passed as selected_item
	function purchaseProduct(selected_item) {

		// convert the selected item into an integer
		selected_item_int = parseInt(selected_item.amount);
		
		// store the query string into a variable to pass to connection.query()
		var query_select = 'SELECT * FROM Products WHERE ?';

		// run the query to match the selected id to what's in the database
        connect.connection.query(query_select, {ItemID: selected_item.id}, function(err_select, data_select) {

        	// if error, throw error
			if (err_select) throw err_select;
            
            // check if the amount in stock is less than the selected amount
        	if (data_select[0].StockQuantity < selected_item_int) {

        		// display apology and error message
        		console.log('\nSorry for the inconveniance, but you selected to purchase more than we have in stock. Please look over our products and make another selection.\n');

        		// start the process over from the selectProduct function
        		selectProduct();

        	} else {

        		// store the updated quantity into a variable to pass to connection.query()
        		var new_quantity = data_select[0].StockQuantity - selected_item_int;

        		// store the price paid into a variable
        		var total_price = data_select[0].Price * selected_item_int;

        		// store the query string into a variable to pass to connection.query() where we are updating both the Products table with the new Stock Quantity and the Departments table with the new Total Sales
        		var query_update = 'UPDATE Products p, Departments d SET p.StockQuantity = ?, d.TotalSales = d.TotalSales + ? WHERE p.ItemID = ? AND d.DepartmentName = ?';

        		// update the Products table with the new StockQuantity for the purchased item
        		connect.connection.query(query_update, [new_quantity, total_price, data_select[0].ItemID, data_select[0].DepartmentName], function(err_update, data_update) {

        			// if error, throw error
					if (err_update) throw err_update;

        		}); // end connection.query()

        		// thank for purchase and display the total amount
        		console.log('\nThank you for your purchase. Total price is $' + total_price + '\n');

        		// start the process over and display the products
        		displayProducts();

        	} // enf if else

        }); // end connection.query()

	} // end purchaseProduct()

	displayProducts();
	
} // end bamazonCust()

bamazonCust();