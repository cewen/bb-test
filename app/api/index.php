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
	
	$res = mysqli_query($mysqli, "SELECT * FROM items");
	
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



// POST route
$app->post(
    '/post',
    function () {
        echo 'This is a POST route';
    }
);

// PUT route
$app->put(
    '/put',
    function () {
        echo 'This is a PUT route';
    }
);

// PATCH route
$app->patch('/patch', function () {
    echo 'This is a PATCH route';
});

// DELETE route
$app->delete(
    '/delete',
    function () {
        echo 'This is a DELETE route';
    }
);

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();