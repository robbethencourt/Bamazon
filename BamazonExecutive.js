function bamazonExec() {
	
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
		
		console.log('view sales by department');

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

			}
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

			}
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

			}
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
    		connection.query(query, values, function(err, data) {

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