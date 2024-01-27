document.getElementById("username").innerHTML = "Welcome " + localStorage.getItem("username") + "!";
    // Function to update the notifications bell count
    function updateNotificationsCount(count) {
        const badge = document.getElementById('notificationsCount');
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }

    // Fetch data from getData.php using JavaScript
    fetch('includes/noti_system.inc.php')
        .then(response => response.json())
        .then(data => {

        })
        .catch(error => console.error('Error fetching data:', error));

        var xhr = new XMLHttpRequest();
xhr.open("POST", "/includes/noti_system.inc.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

var requestData = "username=" + localStorage.getItem("username");

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            console.log("Server response:", xhr.responseText);

            // Try to parse the JSON response
            try {
                // Trim the response before parsing
                var data = JSON.parse(xhr.responseText.trim());
                console.log("Parsed data:", data);

            // Display the data as an HTML table
            let html = "<table><tr><th>ID</th><th>Message</th><th>Status</th></tr>";
            data.forEach(row => {
                if (row.hasOwnProperty('total')) {
                    updateNotificationsCount(row.total);
                }
            });

            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            console.error("Error:", xhr.status, xhr.statusText);
        }
    }
};
xhr.send(requestData);