<?php
class db {
	private $username = 'root';
	private $password = 'root';
	private $database = 'IIAS';
		
	public function __construct(){
		
	}
	
	public function connect(){
		$mysqli = mysqli_connect('localhost', $this->username, $this->password, $this->database);
		if (mysqli_connect_errno($mysqli)) {
		    echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
		
		return $mysqli;
	}
}
?>