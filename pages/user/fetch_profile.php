<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
  // Redirect if user is not logged in
  header("Location: ../../index.html");
  exit();
}

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
  echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
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
    up.field,
    up.profile_pic
  FROM
    login_signup ls
  LEFT JOIN
    user_profile up
  ON
    ls.user_id = up.user_id
  WHERE
    ls.user_id = ?";

$stmt = $conn->prepare($query);

if (!$stmt) {
  echo json_encode(["error" => "Failed to prepare statement: " . $conn->error]);
  exit();
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($first_name, $last_name, $email, $contactNo, $profession, $experience, $field, $profile_pic);

// Fetch the data
$response = [];
if ($stmt->fetch()) {
  $response = [
    'name' => trim("$first_name $last_name"),
    'email' => $email,
    'contactNo' => $contactNo,
    'profession' => $profession,
    'experience' => $experience,
    'field' => $field,
    'profile_pic' => $profile_pic ? base64_encode($profile_pic) : null,
  ];
} else {
  $response['error'] = "No user found with the given ID.";
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
