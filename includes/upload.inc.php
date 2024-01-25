<?php
if (isset($_FILES['files'])) {
  foreach ($_FILES['files']['error'] as $key => $error) {
    if ($error === UPLOAD_ERR_OK) {
      $fileName = $_FILES['files']['name'][$key];
      $fileTmpName = $_FILES['files']['tmp_name'][$key];
      $fileSize = $_FILES['files']['size'][$key];
      $fileError = $_FILES['files']['error'][$key];
      $fileType = $_FILES['files']['type'][$key];

      $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
      $allowedExtensions = array('jpg', 'jpeg', 'png', 'gif', 'pdf', 'docx', 'txt');

      if ($fileError === UPLOAD_ERR_OK) {
        if ($fileSize <= 5000000) { // 5MB limit
          if (in_array($fileExt, $allowedExtensions)) {
            $newFileName = uniqid('', true) . '.' . $fileExt;
            echo "Uploading";
            $fileDestination = '../Projects/Unappproved' . $newFileName;
            echo "Uplopading Finished";

            if (move_uploaded_file($fileTmpName, $fileDestination)) {
              echo "File uploaded successfully: " . $fileName;
            } else {
              echo "Error uploading file: " . $fileName;
            }
          } else {
            echo "Invalid file type for: " . $fileName;
          }
        } else {
          echo "File size exceeds the limit of 5MB for: " . $fileName;
        }
      } else {
        echo "An error occurred during file upload for: " . $fileName;
      }
    }
  }
}
?>