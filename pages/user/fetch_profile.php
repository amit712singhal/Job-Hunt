<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

// Database connection details
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'career_link';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Assuming the user ID is passed as a parameter (you might use sessions or other methods to get the logged-in user ID)
$user_id = 1; // Replace with the actual user ID

// Prepare and bind
$stmt = $conn->prepare("SELECT first_name, last_name, email FROM login_signup WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($first_name, $last_name, $email);

// Fetch the data
$response = [];
if ($stmt->fetch()) {
  $response['name'] = $first_name . ' ' . $last_name;
  $response['email'] = $email;
} else {
  $response['error'] = "No user found with the given ID.";
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
