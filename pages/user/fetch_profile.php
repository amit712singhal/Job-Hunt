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

session_start();
$user_id = $_SESSION['user_id'] ?? null;

if (!isset($user_id)) {
  echo json_encode(["error" => "User not logged in"]);
  header("Location: ../../index.html"); // Redirect to login page if not logged in
  exit();
}

// Prepare and bind
$query = "
  SELECT
    ls.first_name,
    ls.last_name,
    ls.email,
    up.contactNo,
    up.profession,
    up.experience,
    up.field
  FROM
    login_signup ls
  LEFT JOIN
    user_profile up
  ON
    ls.user_id = up.user_id
  WHERE
    ls.user_id = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($first_name, $last_name, $email, $contactNo, $profession, $experience, $field);

// Fetch the data
$response = [];
if ($stmt->fetch()) {
  $response['name'] = $first_name . ' ' . $last_name;
  $response['email'] = $email;
  $response['contactNo'] = $contactNo;
  $response['profession'] = $profession;
  $response['experience'] = $experience;
  $response['field'] = $field;
} else {
  $response['error'] = "No user found with the given ID.";
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
