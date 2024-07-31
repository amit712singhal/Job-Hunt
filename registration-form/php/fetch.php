<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'test';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die('Connection Failed: ' . $conn->connect_error);
}

$sql = "SELECT id, firstName, lastName, gender, email, number, message FROM login";
$result = $conn->query($sql);

if (!$result) {
    die('Error executing query: ' . $conn->error);
}
?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Data</title>
        <link rel="stylesheet" href="../styles/bootstrap.css">
        <style>
            .action-buttons {
                display: flex;
                justify-content: space-between;
            }

            .action-buttons a {
                margin: 0 5px;
            }
        </style>
    </head>

    <body style="
        background: rgb(2, 0, 36);
        background: linear-gradient(
            90deg,
            rgba(2, 0, 36, 1) 0%,
            rgba(209, 209, 237, 1) 100%,
            rgba(0, 212, 255, 1) 100%
        );">
        <div class="container">
            <div class="card col-md-10 offset-md-1" style="padding: 0">
                <div class="card-primary">
                    <div class="card-header text-center" style="
                            color: #fff;
                            background-color: #026ee0;
                            border-color: #007bff;
                            ">
                        <h1>Stored Data</h1>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Message</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                if ($result->num_rows > 0) {

                                    while ($row = $result->fetch_assoc()) {
                                        echo "<tr>
                                            <td>{$row['firstName']}</td>
                                            <td>{$row['lastName']}</td>
                                            <td>{$row['gender']}</td>
                                            <td>{$row['email']}</td>
                                            <td>{$row['number']}</td>
                                            <td>{$row['message']}</td>
                                            <td class='action-buttons'>
                                                <a href='edit.php?id={$row['id']}' class='btn btn-warning btn-sm'>Edit</a>
                                                <a href='delete.php?id={$row['id']}' class='btn btn-danger btn-sm' onclick='return confirm(\"Are you sure you want to delete this record?\");'>Delete</a>
                                            </td>
                                        </tr>";
                                    }
                                } else {
                                    echo "<tr><td colspan='7' class='text-center'>No records found</td></tr>";
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </body>

</html>

<?php
$conn->close();
?>