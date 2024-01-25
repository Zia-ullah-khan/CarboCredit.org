<?php
try {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = $_POST["email"];
        $username = $_POST["username"];
        $password = $_POST["password"];

        require_once "dbh.inc.php"; // Include the file with the database connection logic.

        // Check if the user with the given email exists.
        $checkQuery = "SELECT pwd FROM userids WHERE username = ? LIMIT 1";
        $checkStmt = $pdo->prepare($checkQuery);
        $checkStmt->bindParam(1, $username);
        $checkStmt->execute();

if ($checkStmt->rowCount() > 0) {
    // Fetch user data
    $userData = $checkStmt->fetch(PDO::FETCH_ASSOC);
    // Extract username and password
    $username = $userData['username'];
    $password = $userData['password'];
    header("Location: ../Login.html?sucess=nice");
}
 else {
    // User with the given email doesn't exist; proceed with registration.
    echo "Account does not exist";
}

    } else {
        // Handle non-POST requests by displaying an error message.
        header("Location: ../index.html?error=canthandelrequest");
        exit();
    }
} catch (PDOException $e) {
    // Handle database errors, log the error, and display a user-friendly message.
    error_log("Database error: " . $e->getMessage());
    header("Location: ../index.html");
    exit();
}
?>
