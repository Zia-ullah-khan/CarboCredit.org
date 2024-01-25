<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $issue = $_POST["issue"];
    $message = $_POST["message"];

    // Replace with your email address
    $to = "zia.khan@carbocredit.org";
    $subject = "New Support Form Submission";
    $headers = "From: www.carbocredit.org"; // Replace with your website's email or a valid email

    $email_body = "Issue: $issue\n\nMessage:\n$message";

    // Send the email
    if (mail($to, $subject, $email_body)) {
        echo "Thank you for contacting us!";
    } else {
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    // If the form is not submitted, redirect to the form page
    header("Location: your-form-page.html");
}
?>
