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
        $notificationId = isset($_POST['notificationId']) ? $_POST['notificationId'] : null;

        // Validate input
        if ($notificationId !== null) {
            // Set status
            $status = "yes";

            // Perform the database update
            $updateQuery = "UPDATE notification SET noti_status = 'inactive' WHERE id = ?";
            $stmt = $pdo->prepare($updateQuery);
            $stmt->bindParam(1, $notificationId);

            if ($stmt->execute()) {
                // Update successful
                echo json_encode(['success' => true, 'message' => 'Notification status updated successfully']);
            } else {
                // Update failed
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
