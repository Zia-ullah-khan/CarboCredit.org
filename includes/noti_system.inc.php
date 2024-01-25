<?php
$dsn = "mysql:host=db5014662096.hosting-data.io;dbname=dbs12182555";
$dbusername = "dbu420083";
$dbpassword = "Zia@khan@2008";

try {
    // Database Connection
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch the latest 10 notifications for the specific user
    $username = isset($_POST['username']) ? $_POST['username'] : '';

    $notification = $pdo->prepare('SELECT * FROM notification WHERE noti_user_uniqueid = ? ORDER BY id DESC LIMIT 10');
    $notification->execute([$username]);
    $N_notifications = $notification->rowCount();

    if ($N_notifications > 0) {
        // Count the number of active notifications for the user
        $n_number = $pdo->prepare('SELECT * FROM notification WHERE noti_user_uniqueid = ? AND noti_status = "active" ORDER BY id DESC');
        $n_number->execute([$username]);
        $n_numbers = $n_number->rowCount();

        // Push the total count into the $data array as an object
        $data = array();
        array_push($data, (object)[
            'total' => $n_numbers,
        ]);

        // Fetch and push each notification into the $data array
        while ($row = $notification->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row;
        }
    }

    // Output the data as JSON
    header('Content-Type: application/json');
    echo json_encode($data);

} catch (PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
}
?>
