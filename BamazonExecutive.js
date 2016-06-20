function bamazonExec() {
	
	// npm variable declarations

	// use mysql npm through the mysqlconnect.js file
	var connect = require('./mysqlconnect.js');

	// use inquirer npm
	var inquirer = require('inquirer');
	// store the inquirer prompt in a variable as per the npm inquirer docs so we don't affect other libraries that also rely on inquirer when new prompt types are added or overwritten
	var prompt = inquirer.createPromptModule();

	// use cli-table npm
	var Table = require('cli-table');


	// functions below

	function listActions() {
		
		prompt({
			name: 'action',
			type: 'list',
			message: 'What would you like to do?',
			choices: ['View Product Sales by Department', 'Create New Department']
		// pass the selected action to .then()
		}).then(function(answer) {
			
			// switch statement to call the corresponding function
			switch(answer.action) {

				case 'View Product Sales by Department':

					viewSalesByDepartment();
					break;

				case 'Create New Department':

					createNewDepartment();
					break;

				default:

					listActions();

			} // end switch

		}); // and prompt().then()

	} // end listActions()

	function viewSalesByDepartment() {

		// store the query string into a variable to pass to connection.query()
		var query = 'SELECT * from Departments';

		// pull up the sales data for each department
		connect.connection.query(query, function(err, data) {

			// if error, throw error
			if (err) throw err;

			// create empty arrays to populate the cli-table npm we'll use to display the data
			var head_array = [];
			var table_data = [];

			// loop through the first object in the data array
			for (var key in data[0]) {

				// push the key so that we have the table column names to display
				head_array.push(key);

			} // end for loop

			// add TotalProfit column which we will calculate on the fly
			head_array.push('TotalProfit');

			// create a new instance of cli-table
			var table = new Table({

				// declare the head (or the columns of the table) with the head array created above
				head: head_array

			}); // end new instance of Table() named table()

			// loop through the array returned from connection.query()
			var i;
			var data_length = data.length;
			for (i = 0; i < data_length; i++) {
				
				// loop through each object in the data array returned from connection.query()
				for (var key in data[i]) {

					// push each value from each object into the table data array
					table_data.push(data[i][key]);

				} // end for loop

				// store the profit (positive or negative) from the values in each object
				var TotalProfit = data[i].TotalSales - data[i].OverHeadCosts;

				// push that profit amount into the table data array to populate that last column. Use the toFixed() to force it into 2 decimal places.
				table_data.push(TotalProfit.toFixed(2));

				// push all the data to the cli-table table()
				table.push(table_data);

				// reset the table data to an empty string so we add data to a new array each time we loop through a new object
				table_data = [];

			} // end for loop

			// display table showing department details
			console.log(table.toString());

    		// start the process over and list actions
    		listActions();

		}); // end connection.query()

	} // end viewSalesByDepartment()

	function createNewDepartment() {
		
		// ask the user what department they would like to add
		prompt([{
			name: 'name',
			type: 'input',
			message: 'What is the name of the new department?',
			validate: function(value) {

				// check if the user entered anything
				if (value !== '') {

					// continues with the application
					return true;

				} else {

					// display error message and display the question again
					console.log('\n\nIt doesn\'t appear as if you entered anything. Try again.\n');
					return false;

				} // end if else

			} // end validate()
		}, {
			name: 'overhead_costs',
			type: 'input',
			message: 'What are the overhead costs associated with this department?',
			validate: function(value) {

				// check if the user entered value is a number
				if (isNaN(value) == false) {

					// continues with the application
					return true;

				} else {

					// display error message and display the question again
					console.log('\n\nWe need a number for the costs of the department.\n');
					return false;

				} // end if else

			} // end validate()
		}, {
			name: 'total_sales',
			type: 'input',
			message: 'What are the total sales for the department?',
			validate: function(value) {

				// check if the user entered value is a number
				if (isNaN(value) == false) {

					// continues with the application
					return true;

				} else {

					// display error message and display the question again
					console.log('\n\nWe need a number for the total sales of the department.\n');
					return false;

				} // end if else

			} // end validate()
		// pass the name, overhead costs and total sales to .then()
		}]).then(function(answer) {

			// convert the answers that require integers to integers
			var overhead_costs_int = parseFloat(answer.overhead_costs);
			var total_sales_int = parseFloat(answer.total_sales);
			
			// store the query string into a variable to pass to connection.query()
    		var query = 'INSERT INTO Departments SET ?';

    		// store the values into an object to pass to connection.query()
    		var values = {
    			DepartmentName: answer.name,
    			OverHeadCosts: overhead_costs_int,
    			TotalSales: total_sales_int
    		}

    		// update the Departments table with the new department
    		connect.connection.query(query, values, function(err, data) {

    			// if error, throw error
				if (err) throw err;

				// display message stating quantity has been updated
				console.log('\nDepartment has been created\n');

	    		// start the process over and list actions
	    		listActions();

    		}); // end connection.query()
		
		});  // end prompt().then()

	} // end createNewDepartment()

	listActions();

} // end bamazonExec()

bamazonExec();