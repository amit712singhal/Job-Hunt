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
$mysqli = new mysqli($servername, $username, $password, $dbname);

if ($mysqli->connect_error) {
  echo json_encode(["error" => "Failed to connect to database"]);
  exit();
}

// Read the raw input and decode the JSON data
$data = json_decode(file_get_contents('php://input'), true);

session_start();
$user_id = $_SESSION['user_id'] ?? null;

if (!isset($user_id)) {
  echo json_encode(["error" => "User not logged in"]);
  header("Location: ../../index.html"); // Redirect to login page if not logged in
  exit();
}

$name = $data['name'] ?? null;
$email = $data['email'] ?? null;
$contactNo = $data['contactNo'] ?? null;
$profession = $data['profession'] ?? null;
$experience = $data['experience'] ?? null;
$field = $data['field'] ?? null;

// Check required fields
if (!$name || !$email) {
  echo json_encode(["error" => "Name and email are required"]);
  exit();
}

// Split the name into first name and last name
$nameParts = explode(' ', $name, 2);
$first_name = $nameParts[0];
$last_name = isset($nameParts[1]) ? $nameParts[1] : null;

// Update login_signup table
$update_login_signup = "UPDATE login_signup SET first_name = ?, last_name = ?, email = ? WHERE user_id = ?";
$stmt1 = $mysqli->prepare($update_login_signup);
$stmt1->bind_param("sssi", $first_name, $last_name, $email, $user_id);
$success_login_signup = $stmt1->execute();
$stmt1->close();

if (!$success_login_signup) {
  echo json_encode(["error" => "Failed to update login_signup"]);
  exit();
}

// Check if the user_profile exists for the user_id
$check_profile = "SELECT user_id FROM user_profile WHERE user_id = ?";
$stmt2 = $mysqli->prepare($check_profile);
$stmt2->bind_param("i", $user_id);
$stmt2->execute();
$stmt2->store_result();

if ($stmt2->num_rows > 0) {
  // Update existing profile
  $update_profile = "UPDATE user_profile SET contactNo = ?, profession = ?, experience = ?, field = ? WHERE user_id = ?";
  $stmt3 = $mysqli->prepare($update_profile);
  $stmt3->bind_param("ssssi", $contactNo, $profession, $experience, $field, $user_id);
} else {
  // Insert new profile
  $insert_profile = "INSERT INTO user_profile (user_id, contactNo, profession, experience, field) VALUES (?, ?, ?, ?, ?)";
  $stmt3 = $mysqli->prepare($insert_profile);
  $stmt3->bind_param("issss", $user_id, $contactNo, $profession, $experience, $field);
}
$stmt2->close();

$success_profile = $stmt3->execute();
$stmt3->close();

$mysqli->close();

if ($success_login_signup && $success_profile) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["error" => "Failed to update profile"]);
}
?>
