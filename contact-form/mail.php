<?php
$headers = 'From: hello@world.com' . "\r\n" .
    'Reply-To: nice:work.com' . "\r\n" .
    'Content-Type: text/plain; charset=iso-8859-1' . "\r\n" .
    'Content-Transfer-Encoding: 8bit';

$name = (isset($_GET['name'])) ? $_GET['name'] : '';
$email = (isset($_GET['email'])) ? $_GET['email'] : '';
$subject = (isset($_GET['subject'])) ? $_GET['subject'] : '';
$message = (isset($_GET['message'])) ? $_GET['message'] : '';

$content = "From: $name\nEmail: $email\nSubject: $subject\nMessage: $message";
$recipient = 'rakshit.singhal712@gmail.com';

if(mail($recipient, $subject, $content, $headers)) {
    echo 'Email sent successfully';
} else {
    echo 'An error occurred';
}
?>