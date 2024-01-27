document.getElementById("loginForm").style.display = "none";
document.getElementById("WELCOME").style.animation = 'fadeOut 2s forwards';

document.getElementById("loginForm").style.display = "none";
document.getElementById("welcome2").style.display="none";
document.getElementById("WELCOME").style.top = "100%";


document.getElementById("WELCOME").style.display = 'none';
document.getElementById("loginForm").style.display = 'block';
document.getElementById("welcome2").style.display = 'block';
document.getElementById("loginForm").style.animation = 'fadeIn 2s forwards';


    //

// Check if there is an error message in the URL
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get("error");

if (error === "noerror") {
    window.href.location("/includes/loginhandler.inc.php")
}    
    
    
    // Placeholder variable to store the user's XRP address
    var userXRPAddress = '';

    // Function to populate the XRP address field in the form
    function populateXRPAddress() {
        localStorage.setItem('email', document.getElementById("email").value)
        var xumm = new Xumm('1e9144b6-adcf-45ac-bc96-930311f872eb'); // Replace with your Xumm App ID
        xumm.logout();

        xumm.on("ready", () => console.log("Ready (e.g. hide loading state of xApp)"));
        setTimeout(function() {
        xumm.authorize();
        }, 10500);

        xumm.on("success", async () => {
            xumm.user.account.then(account => {
                userXRPAddress = account; // Store the user's XRP address
                document.getElementById('accountaddress').innerText = userXRPAddress;

                // Automatically fill the input field with the address
                var addressInput = document.getElementById('address2');
                addressInput.value = userXRPAddress;
            });
        });

        xumm.on("logout", async () => {
                var addressInput = document.getElementById('address2');
                addressInput.value = userXRPAddress;
        })

        xumm.user.account.then(account => {
            document.getElementById('accountaddress').innerText = account;
        });
    }

    // Call the function to populate the XRP address
    populateXRPAddress();