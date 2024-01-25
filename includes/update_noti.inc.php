<?php
$dsn = "mysql:host=db5014662096.hosting-data.io;dbname=dbs12182555";
$dbusername = "dbu420083";
$dbpassword = "Zia@khan@2008";

try {
    // Database Connection
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retrieve the username, amount, and project from the POST request
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $amount = isset($_POST['amount']) ? $_POST['amount'] : '';
    $project = isset($_POST['project']) ? $_POST['project'] : '';

    $project = str_replace("purchase_", "", $project);

    // Create notification message
    $data = "Hi " . $username . ", " . $username . " is willing to buy " . $amount . " credits from your " . $project . " project";

    // Insert notification into the database
    $notification = $pdo->prepare('INSERT INTO `notification` (`noti_user_uniqueid`, `noti_status`, `noti_data`, `noti_seen`) VALUES (?, "active", ?, "no")');
    $notification->execute([$username, $data]);
    $N_notifications = $notification->rowCount();

    // Output success message
    echo "Notification inserted successfully.";

} catch (PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
}
?>
