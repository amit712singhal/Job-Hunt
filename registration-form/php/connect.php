<?php

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$gender = $_POST['gender'];
$email = $_POST['email'];
$number = $_POST['number'];
$message = $_POST['message'];

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'test';

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error){
    die('Connection Failed : '.$conn->connect_error);
} else {
    $stmt = $conn->prepare("INSERT INTO login (firstName, lastName, gender, email, number, message) VALUES (?, ?, ?, ?, ?, ?)");

    if ($stmt === false) {
        die('Prepare Failed: ' . $conn->error);
    }

    $stmt->bind_param("ssssis", $firstName, $lastName, $gender, $email, $number, $message);

    if ($stmt->execute() === false) {
        die('Execute Failed: ' . $stmt->error);
    } else {
        echo "Registration successful...";
    }

    $stmt->close();
    $conn->close();
}

//reroute
header("Location: ../index.html");
exit();
?>
