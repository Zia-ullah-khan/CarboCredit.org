document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

let matchResult = "";
let message = "";
let name = "";
let username = "";
let publicKeyObject = "";

function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/includes/noti_system.inc.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    username = localStorage.getItem("username");

    const requestData = "username=" + localStorage.getItem("username");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText.trim());
                    renderTable(data);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            } else {
                console.error("Error:", xhr.status, xhr.statusText);
            }
        }
    };

    xhr.send(requestData);
}

function renderTable(data) {
    let html = "<table><tr><th>ID</th><th>Message</th><th></th><th>Status</th></tr>";

    data.forEach(row => {
        if (row.id) {
            message = row.noti_data;
            const notificationId = row.id;

            html += `<tr>
                        <td>${row.id}</td>
                        <td>${row.noti_data}</td>
                        <td><button data-id="${notificationId}">Continue with deal</button></td>
                        <td id="status-${notificationId}">${row.noti_status}</td>
                     </tr>`;
        }
    });

    html += "</table>";
    document.getElementById('notificationData').innerHTML = html;

    addEventListeners();
}

function addEventListeners() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const notificationId = this.getAttribute('data-id');
            matchResult = message.match(/from your (.*)/i)[1];
            updateNotificationStatus(notificationId);
            getuser(matchResult);
            setTimeout(function () {
                getPownerkey(name);
                getamount(name, username, matchResult);
            }, 2000);
        });
    });
}

function updateNotificationStatus(notificationId) {
    const updateStatusXHR = new XMLHttpRequest();
    updateStatusXHR.open("POST", "/includes/update_status.inc.php", true);
    updateStatusXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    const updateData = `notificationId=${notificationId}&status=inactive`;

    updateStatusXHR.onreadystatechange = function () {
        if (updateStatusXHR.readyState === 4) {
            if (updateStatusXHR.status === 200) {
                console.log("Notification status updated successfully:", updateStatusXHR.responseText);
            } else {
                console.error("Error updating notification status:", updateStatusXHR.status, updateStatusXHR.statusText);
            }
        }
    };

    updateStatusXHR.send(updateData);
}

function getuser(project) {
    const updateStatusXHR = new XMLHttpRequest();
    updateStatusXHR.open("POST", "/includes/get-username.inc.php", true);
    updateStatusXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    matchResult = message.match(/from your (.*)/i)[1];
    const updateData = `project=${matchResult}`;

    updateStatusXHR.onreadystatechange = function () {
        if (updateStatusXHR.readyState === 4) {
            if (updateStatusXHR.status === 200) {
                const jsonString = updateStatusXHR.responseText;
                const jsonObject = JSON.parse(jsonString);
                name = jsonObject.username;
                localStorage.setItem("name", name);
                console.log(name);
            } else {
                console.error("Unable to get username:", updateStatusXHR.status, updateStatusXHR.statusText);
            }
        }
    };

    updateStatusXHR.send(updateData);
}

function getPownerkey(username) {
    const updateStatusXHR = new XMLHttpRequest();
    updateStatusXHR.open("POST", "/includes/get-user-Pkey.inc.php", true);
    updateStatusXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    const updateData = `name=${name}`;

    updateStatusXHR.onreadystatechange = function () {
        if (updateStatusXHR.readyState === 4) {
            if (updateStatusXHR.status === 200) {
                const jsonObject = JSON.parse(updateStatusXHR.responseText);
                publicKeyObject = jsonObject.public_key;
                console.log("Parsed Public Key:", publicKeyObject);
            } else {
                console.error("Unable to get public key:", updateStatusXHR.status, updateStatusXHR.statusText);
            }
        }
    };

    updateStatusXHR.send(updateData);
}

function getamount(purcharser, to, project) {
    const updateStatusXHR = new XMLHttpRequest();
    updateStatusXHR.open("POST", "/includes/get-amount.inc.php", true);
    updateStatusXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    const updateData = `purcharser=${purcharser}&to=${to}&project=${project}`;

    updateStatusXHR.onreadystatechange = function () {
        if (updateStatusXHR.readyState === 4) {
            if (updateStatusXHR.status === 200) {
                const jsonObject = JSON.parse(updateStatusXHR.responseText);
                const amount = jsonObject.amount;
                const publickey = `publicKey=${encodeURIComponent(publicKeyObject)}`;
                const ammount = `&amount=${encodeURIComponent(amount)}`;
                window.location.href = `payment.html?${publickey}${ammount}`;
            } else {
                console.error("Unable to get public key:", updateStatusXHR.status, updateStatusXHR.statusText);
            }
        }
    };

    updateStatusXHR.send(updateData);
}
