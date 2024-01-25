<?php
    // Get the JSON string from the request body
    $json = file_get_contents('php://input');

    // Convert the JSON string to an object
    $data = json_decode($json);

    // Now you can use the data
    $clientName = $data->clientName;
    $invoiceDate = $data->invoiceDate;
    $clientEmail = $data->clientEmail;
    $total = $data->total;
    $items = $data->items;

    // Prepare the invoice data
    $invoiceData = "";
    foreach($items as $item) {
        $invoiceData .= "Item: {$item->itemName}\nDescription: {$item->itemDescription}\nQuantity: {$item->quantity}\nPrice: {$item->price}\nTotal: {$item->itemTotal}\n\n";
    }

    // Prepare the email
    $to = $clientEmail;
    $subject = "Invoice for $clientName";
    $message = "Dear $clientName,\n\nHere is your invoice dated $invoiceDate:\n\n$invoiceData\nTotal: $total"; // Include the invoice data in the message
    $headers = 'From: zia.khan@carbocredit.org' . "\r\n" .
               'Reply-To: zia.khan@carbocredit.org' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    // Send the email
    if(mail($to, $subject, $message, $headers)) {
        echo json_encode(['message' => 'Email sent successfully']);
    } else {
        echo json_encode(['message' => 'Email could not be sent']);
    }
?>