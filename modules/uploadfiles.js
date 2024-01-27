function validatePictureCount() {
    const files = document.getElementById('file').files;
    if (files.length < 5) {
      document.getElementById('error-message').textContent = "Please upload at least 5 pictures.";
      return false; // Prevent form submission
    }
    return true; // Allow form submission
  }