// script.js

document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("loginForm");

    // Hide the login form initially
    loginForm.style.display = "none";

    // Animate the welcome message
    var welcomeMessage = document.getElementById("WELCOME");
    welcomeMessage.style.animation = 'slideDown 2s forwards';

    // Show the login form and welcome message after animation
    welcomeMessage.addEventListener("animationend", function () {
        loginForm.style.display = 'block';
        document.getElementById("welcome2").style.display = 'block';
        loginForm.style.animation = 'fadeIn 2s forwards';
    });

    // Event listener for form submission
    loginForm.addEventListener("submit", function (event) {
        // Get the username from the input field
        var username = document.getElementById("username").value;

        // Store the username in localStorage
        localStorage.setItem("username", username);
    });

    // Check for "sucess" parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("sucess");

    if (success === "nice") {
        populateXRPAddress();
    }

    function populateXRPAddress() {
        var xumm = new Xumm('1e9144b6-adcf-45ac-bc96-930311f872eb'); // Replace with your Xumm App ID

        xumm.on("ready", () => console.log("Ready (e.g. hide loading state of xApp)"));
        
        setTimeout(function () {
            xumm.authorize();
        });

        xumm.on("success", async () => {
            xumm.user.account.then(account => {
                window.location.href = "index"; // Add the destination URL here
            });
        });
    }
});
