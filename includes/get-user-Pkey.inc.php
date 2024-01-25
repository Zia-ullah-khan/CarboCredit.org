<?php
// update_status.php
$dsn = "mysql:host=db5014662096.hosting-data.io;dbname=dbs12182555";
$dbusername = "dbu420083";
$dbpassword = "Zia@khan@2008";

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Retrieve POST data
        $name = isset($_POST['name']) ? $_POST['name'] : null;

        // Validate input
        if ($name !== null) {
            // Set status
            $status = "yes";

            // Perform the database update
            $updateQuery = "SELECT publickey FROM `userids` where username = ?";
            $stmt = $pdo->prepare($updateQuery);
            $stmt->bindParam(1, $name);
            if ($stmt->execute()) {
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                //username
                echo json_encode(['public_key' => $result['publickey']]);
            } else {
                //failed to get username
                echo json_encode(['success' => false, 'message' => 'Error updating notification status']);
            }

            $stmt->closeCursor();
        } else {
            // Invalid input
            echo json_encode(['success' => false, 'message' => 'Invalid input parameters']);
        }
    } else {
        // Invalid request method
        echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    }

    // Close the database connection
    $pdo = null;
} catch (PDOException $e) {
    // Handle connection error
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]);
    exit;
}
?>
