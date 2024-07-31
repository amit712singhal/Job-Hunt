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

$sql = "SELECT firstName, lastName, gender, email, number, message FROM login WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if (!$row) {
    die('Record not found');
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $message = $_POST['message'];

    $sql = "UPDATE login SET firstName = ?, lastName = ?, gender = ?, email = ?, number = ?, message = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssssisi', $firstName, $lastName, $gender, $email, $number, $message, $id);

    if ($stmt->execute()) {
        echo "Record updated successfully";
        header("Location: fetch.php");
        exit();
    } else {
        echo "Error updating record: " . $conn->error;
    }
}

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Edit Data</title>
        <link rel="stylesheet" href="../styles/bootstrap.css">
    </head>
    
    <body style="
        background: rgb(2, 0, 36);
        background: linear-gradient(
            90deg,
            rgba(2, 0, 36, 1) 0%,
            rgba(209, 209, 237, 1) 100%,
            rgba(0, 212, 255, 1) 100%
        );
        ">
        <div class="container">
            <div class="card col-md-6 offset-md-3" style="padding: 0">
                <div class="card-primary">
                    <div
                        class="card-header text-center"
                        style="
                        color: #fff;
                        background-color: #026ee0;
                        border-color: #007bff;
                        "
                    >
                    <h1>Edit Registered Data</h1>
                    </div>
                    <div class="card-body">
                        <form action="" method="POST">
                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input type="text" class="form-control" id="firstName" name="firstName" value="<?php echo htmlspecialchars($row['firstName']); ?>" required>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" class="form-control" id="lastName" name="lastName" value="<?php echo htmlspecialchars($row['lastName']); ?>" required>
                            </div>
                            <div class="form-group">
                                <label for="gender">Gender</label>
                                <div>
                                    <input type="radio" name="gender" value="m" id="male" <?php if ($row['gender'] == 'm') echo 'checked'; ?> required>
                                    <label class="form-check-label" for="male" style="padding-right: 7px; padding-left: 3px">Male</label>
                                    <input type="radio" name="gender" value="f" id="female" <?php if ($row['gender'] == 'f') echo 'checked'; ?> required>
                                    <label class="form-check-label" for="female" style="padding-right: 7px; padding-left: 3px">Female</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" name="email" value="<?php echo htmlspecialchars($row['email']); ?>" required>
                            </div>
                            <div class="form-group">
                                <label for="number">Phone Number</label>
                                <input type="text" class="form-control" id="number" name="number" value="<?php echo htmlspecialchars($row['number']); ?>" required>
                            </div>
                            <div class="form-group">
                                <label for="message">Message</label>
                                <input type="text" class="form-control" id="message" name="message" value="<?php echo htmlspecialchars($row['message']); ?>" required>
                            </div>
                            <input type="submit" class="btn btn-primary" value="Update">
                        </form>
                    </div>
                    <div class="card-footer text-right" style="background-color: #e7e7e7;">
                        <large>&copy; Amit Singhal</large>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
