<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json'); // Ensure the response is JSON

// Database connection details
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'career_link';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Get POST data
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$user_type = $_POST['user-type'];

// Check if data is received correctly
if (empty($name) || empty($email) || empty($password) || empty($user_type)) {
    echo json_encode(["status" => "error", "message" => "Please fill in all fields."]);
    exit();
}

// Check if the email already exists
$email_check_query = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($email_check_query);

if ($stmt === false) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
    exit();
}

$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email is already registered."]);
    $stmt->close();
    $conn->close();
    exit();
}

$stmt->close();

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Split the name into first and last name
$name_parts = explode(' ', $name, 2);
$first_name = $name_parts[0];
$last_name = isset($name_parts[1]) ? $name_parts[1] : '';

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, hashed_password, user_type) VALUES (?, ?, ?, ?, ?)");

if ($stmt === false) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
    exit();
}

$stmt->bind_param("sssss", $first_name, $last_name, $email, $hashed_password, $user_type);

// Execute the query
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "New record created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>