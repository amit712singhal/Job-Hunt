<?php

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'test';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die('Connection Failed: ' . $conn->connect_error);
}

$id = $_GET['id'];

$sql = "DELETE FROM login WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);

if ($stmt->execute()) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

$stmt->close();
$conn->close();

//reroute
header("Location: fetch.php");
exit();
?>
