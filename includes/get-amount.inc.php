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
        $purcharser = isset($_POST['purcharser']) ? $_POST['purcharser'] : null;
        $to = isset($_POST['to']) ? $_POST['to'] : null;
        $project = isset($_POST['project']) ? $_POST['project'] : null;

        // Validate input
        if ($purcharser !== null && $to !== null && $project !== null) {

            // get amount from database
            $updateQuery = "SELECT `Amount` FROM `Payments` WHERE `Project` = ? AND `purcharser` = ? AND `purchasee` = ?";
            $stmt = $pdo->prepare($updateQuery);
            $stmt->bindParam(1, $project);
            $stmt->bindParam(2, $purcharser);
            $stmt->bindParam(3, $to);
            if ($stmt->execute()) {
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                //username
                echo json_encode(['amount' => $result['Amount']]);
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
