<?php
$servername = "18.224.151.89";
$username = "mahendra";
$password = "Vardhan@2233";
$dbname = "car_leasing";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


echo "Signup Success.Proceed to login.";
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
</head>
<body>
    <p>Please click the button below to log in:</p>
    <a href="index.html"> Login </a>
    
    <!-- Login button that redirects to the login page -->
</body>
</html>
