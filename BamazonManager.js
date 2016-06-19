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
			
		console.log('view products');

	} // end viewProducts()

	function viewLowInventory() {
		
		console.log('view low inventory');

	} // end viewLowInventory()

	function addToInventory() {
		
		console.log('add to inventory');

	} // end addToInventory()

	function addNewProduct() {
		
		console.log('add new product');

	} // end addNewProduct()

	listActions();

} // end bamazonManager()

bamazonManager();