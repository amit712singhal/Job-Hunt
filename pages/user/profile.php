<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "career_link";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Function to insert values into the profile table when user logs in
function insertIntoProfile($userId)
{
  global $conn;

  // Check if the user already exists in the profile table
  $checkSql = "SELECT user_id FROM profile WHERE user_id = $userId";
  $result = $conn->query($checkSql);

  if ($result->num_rows == 0) {
    // Retrieve user details from login_signup table
    $userSql = "SELECT first_name, last_name, created_at FROM login_signup WHERE user_id = $userId";
    $userResult = $conn->query($userSql);

    if ($userResult->num_rows > 0) {
      $user = $userResult->fetch_assoc();

      // Insert the retrieved data into the profile table
      $insertSql = "INSERT INTO profile (user_id, first_name, last_name, created_at)
                          VALUES ($userId, '{$user['first_name']}', '{$user['last_name']}', '{$user['created_at']}')";

      if ($conn->query($insertSql) === TRUE) {
        echo "Profile created successfully.";
      } else {
        echo "Error creating profile: " . $conn->error;
      }
    }
  }
}

// Example: Call the function when user logs in
$userId = 1; // Replace with the actual user ID upon login
insertIntoProfile($userId);

$conn->close();
?>
