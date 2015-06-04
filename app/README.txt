Xavier de Frutos

BorderGuru Application : Technical Assignment

---------------------------------------------------------------------------------

Environment and verions :

	- node.js : v 0.12.4
	- mongodb : v 3.0.3
	- npm : v 2.10.1

---------------------------------------------------------------------------------

Build instructions :

	- make sure you have proper versions of node.js, npm and mongodb (as specified above) installed on your system

	- run mongodb daemon locally on default configuration (localhost, port 27017)
		database location is in the "data" folder at the root of the app folder

		$ mongod --dbpath /BorderGuru Assignment/app/data

	- make sure that you are using the correct database named "appdb"

		in mongo shell
			> use appdb

		alternatively you can use "test" database
		in mongo shell
			> use test

		but make sure it is correctly specified in app.js file (at the root of the app folder), line 26

			mongoose.connect('mongodb://localhost/appdb') ;
			> mongoose.connect('mongodb://localhost/test') ;


	- once mongodb daemon is running, start node.js web application from node package manager

		$ cd /BorderGuru Assignment/app
		$ npm start

	- then access this application in your web browser at localhost, on Node. js default port

		http://localhost:3000/

---------------------------------------------------------------------------------

Usage : 

	OrdersViewer interface is set as two separated parts consisting of :

		- two icons representing a cart and a database
		- two dropdown menus and the "go" button

	* Cart icon is used to show a list of ordered items with the amount of order
	for each item.

	* Database icon serves for reloading (or resetting) the database as is in sample.dat file

	* first dropdown menu is used to choose what information you would take interest in
	(customer address, specific order, or company names)

	* second one allow you to choose between all existing occurrences of the chosen
	information in the database (as set in the previous drop down menu)

	* finally click the “go” button to see a list of concerned orders (displayed as circles below 	“go” button)

	Once you have set the two dropdown menus, click "go" button and look the round
	buttons appearing below "go" button.
	Each one represents an order and you can access order details by placing
	the mouse cursor on it.


---------------------------------------------------------------------------------

Troubleshooting :

	If no orders or no options are displayed in one or both of the dropdown menus
	as well as no items in the ordered items list (after clicking the cart icon, left icon below
	the main logo), try reloading database by clicking the database icon (right icon, just 	below the main logo), then click “Load Sample data” button