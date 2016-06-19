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
		
		console.log('create new department');

	} // end createNewDepartment()

	listActions();

} // end bamazonExec()

bamazonExec();