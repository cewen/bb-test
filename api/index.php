<?php
require('db.php');

/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */

// GET route
$app->get('/', function(){
	$db = new db();
	$mysqli = $db->connect();
	
	$res = mysqli_query($mysqli, "SELECT * FROM items");
	
	while ($row = mysqli_fetch_assoc($res)) {
		print_r(json_encode($row));
		echo '<br>';
	}
	
	#error_log(print_r($row, true));
});


// Get all dishes
$app->get('/dishes', function() {
	$db = new db();
	$mysqli = $db->connect();
	
	$result_array = array();
	
	$res = mysqli_query($mysqli, "SELECT * FROM items WHERE flag != 1");
	
	while ($row = mysqli_fetch_assoc($res)) {
		array_push($result_array, $row);
	}
	
	echo json_encode($result_array);
});

// Get one dish by name
$app->get('/dish/:name', function($name){
	$db = new db();
	$mysqli = $db->connect();
	
	$name = filter_var($name, FILTER_SANITIZE_STRING);
	$res = mysqli_query($mysqli, "SELECT * FROM items WHERE name = '$name'");
	$row = mysqli_fetch_assoc($res);
	
	echo(json_encode($row));
});



// Create a new dish
$app->post('/dish', function () use ($app){
	$db = new db();
	$mysqli = $db->connect();

	$request = json_decode($app->request->getBody());
	$name = filter_var($request->name, FILTER_SANITIZE_STRING);
	
	mysqli_query($mysqli, "INSERT INTO items (name, response, is_salad, flag) VALUES('$name', '', 2, 1)");
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($request);
});


// Update a dish
$app->put('/dish', function () use ($app){
	$db = new db();
	$mysqli = $db->connect();

	$request = json_decode($app->request->getBody());
	$name = filter_var($request->name, FILTER_SANITIZE_STRING);
	$response = filter_var($request->response, FILTER_SANITIZE_STRING);
	
	$query = "
		INSERT INTO items (name, response, is_salad, flag) 
		VALUES('$name', '', 2, 1) 
		ON DUPLICATE KEY 
		UPDATE name='$name', response='$response', is_salad=$request->is_salad, flag=$request->flag";

	mysqli_query($mysqli, $query);
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($request);
});

// Delete a dish
$app->delete('/dish', function() use($app) {
	$db = new db();
	$mysqli = $db->connect();
	$request = json_decode($app->request->getBody());

	$name = filter_var($request->name, FILTER_SANITIZE_STRING);

	$query = "
		DELETE FROM items 
		WHERE name='$name'";
		
	mysqli_query($mysqli, $query);
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($request);
});




// ADMIN ROUTES
$app->get('/admin/dishes', function() {
	$db = new db();
	$mysqli = $db->connect();
	
	$result_array = array();
	
	$res = mysqli_query($mysqli, "SELECT * FROM items WHERE flag = 1");
	
	while ($row = mysqli_fetch_assoc($res)) {
		array_push($result_array, $row);
	}
	
	echo json_encode($result_array);
});



// // PUT route
// $app->put(
//     '/put',
//     function () {
//         echo 'This is a PUT route';
//     }
// );
// 
// // PATCH route
// $app->patch('/patch', function () {
//     echo 'This is a PATCH route';
// });
// 
// // DELETE route
// $app->delete(
//     '/delete',
//     function () {
//         echo 'This is a DELETE route';
//     }
// );

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
