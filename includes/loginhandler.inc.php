<?php
try {
    require_once "dbh.inc.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST["username"];
        $password = $_POST["password"];


        // Check if the user with the given email already exists.
        $checkQuery = "SELECT pwd FROM userids WHERE username = ? LIMIT 1";
        $checkStmt = $pdo->prepare($checkQuery);
        $checkStmt->execute([$username]);

if ($checkStmt->rowCount() > 0) {
    // Fetch user data
    $userData = $checkStmt->fetch(PDO::FETCH_ASSOC);

    // Extract username and password
    $username = $userData['username'];
    $password = $userData['password'];

    // Redirect to payment.html
    header("Location: ../payment.html");
    exit; // Stop further script execution
} else {
    // User with the given email doesn't exist; proceed with registration.
    echo "Account does not exist";
}

    } else {
        // Handle non-POST requests by displaying an error message.
        header("Location: ../payment.html");
        exit();
    }
} catch (PDOException $e) {
    // Handle database errors, log the error, and display a user-friendly message.
    error_log("Database error: " . $e->getMessage());
    header("Location: ../payment.html");
    exit();
}

?>