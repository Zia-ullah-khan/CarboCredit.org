<?php
$dsn = "mysql:host=db5014662096.hosting-data.io;dbname=dbs12182555";
$dbusername = "dbu420083";
$dbpassword = "Zia@khan@2008";

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Retrieve POST data
        $project = isset($_POST['project']) ? $_POST['project'] : null;
        $purchasee = isset($_POST['purchasee']) ? $_POST['purchasee'] : null;
        $purcharser = isset($_POST['purcharser']) ? $_POST['purcharser'] : null;
        $amount = isset($_POST['amount']) ? $_POST['amount'] : null;

        // Validate input
        if ($project !== null && is_numeric($amount)) {

            // Perform the database update
            $updateQuery = "INSERT INTO Payments (`Project`, `Amount`, `purcharser`, `purchasee`) VALUES (?, ?, ?, ?)";
            $stmt = $pdo->prepare($updateQuery);
            $stmt->bindParam(1, $project);
            $stmt->bindParam(2, $amount);
            $stmt->bindParam(3, $purcharser);
            $stmt->bindParam(4, $purchasee);

            // Check if the execution was successful
            if ($stmt->execute()) {
                // Note: Since it's an INSERT statement, there is no need to fetch any data.
                echo json_encode(['success' => true, 'message' => 'Payment status updated successfully']);
            } else {
                // Log or report the specific database error
                $errorInfo = $stmt->errorInfo();
                echo json_encode(['success' => false, 'message' => 'Error updating payment status: ' . $errorInfo[2]]);
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
