document.getElementById("username").innerHTML = "Welcome " + localStorage.getItem("username") + "!";
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
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
    // Display the data as an HTML table
    let html = "<table><tr><th>ID</th><th>Message</th><th>Status</th></tr>";
})
.catch(error => console.error('Error fetching data:', error));

document.getElementById("username").innerHTML = "Welcome " + localStorage.getItem("username") + "!";

// Function to get the query parameter value from the URL
function getQueryParam(param) {
const urlParams = new URLSearchParams(window.location.search);
return urlParams.get(param);
}

// Set the destination text box with the "publicKey" parameter from the URL
const destinationTextBox = document.getElementById("Destination");
const publicKeyFromURL = getQueryParam("publicKey");

// Set the amount text box with the "amount" parameter from the URL
const amountTextBox = document.getElementById("Amount");
const amountFromURL = getQueryParam("amount");
console.log(amountFromURL)

if (publicKeyFromURL) {
destinationTextBox.value = publicKeyFromURL;
}

if (amountFromURL) {
amountTextBox.value = amountFromURL;



}



const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get("error");
if (error === "purchase_Shinkad") {
    document.getElementById("title").innerText = "Purchase";
    document.getElementById("Destination").style.display = "none";
    document.getElementById("DestinationLabel").style.display = "none";
    document.getElementById('Destination').removeAttribute('required');
    document.getElementById("DestinationTag").style.display = "none";
    document.getElementById("Destination_Tag").style.display = "none";
    document.getElementById("ammountablel").innerText = "Amount of Carbon Credits";
    document.getElementById("submit").value = "Purchase";
}
function createPayment(event) {
event.preventDefault();
// Send the username to the server using AJAX
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get("error");

var xhr = new XMLHttpRequest();
xhr.open("POST", "/includes/update_noti.inc.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// Define the data to be sent in the AJAX request
var requestData = "username=" + encodeURIComponent(localStorage.getItem("username")) +
"&project=" + encodeURIComponent(error) +
"&amount=" + encodeURIComponent(document.getElementById("Amount").value);

xhr.onreadystatechange = function () {
if (xhr.readyState == 4 && xhr.status == 200) {
// Print the response from the server to the console
console.log(xhr.responseText);

// You can also display the response on the screen if needed
var responseElement = document.getElementById("response");
if (responseElement) {
    responseElement.innerHTML = xhr.responseText;
}
}
};

// Send the AJAX request
xhr.send(requestData);
console.log(requestData);

var username = document.getElementById("username").value
console.log(username)
var xumm = new Xumm('1e9144b6-adcf-45ac-bc96-930311f872eb');


var amount = document.getElementById("Amount").value;
amount = parseFloat(inputBox.value) * 1000000;
amount = String(amount)
xumm.payload.createAndSubscribe({
    TransactionType: 'Payment',
    Destination: "rBEBELEavHeCmWw4dGjDfLT4JpoHsXJhxB",
    Amount: amount,
    Fee: 15,
})
    .then(({ created, resolved }) => {
    console.log('Payload URL:', created.next.always);
    console.log('Payload QR:', created.refs.qr_png);
    console.log(created.response)


    // Get the img element by its id
    var qrCodeImg = document.getElementById("qrCode");
    var text = document.getElementById("title");


    // Set the src attribute of the img element to the QR code URL
    qrCodeImg.src = created.refs.qr_png;


    text.innerText = "Please Scan the QR code to continue"


    qrCodeImg.style.display = "block";
    return resolved;
    setTimeout(function() {
    const txInfo = Sdk.getTransaction(txHash);
    console.log(txinfo)


update_payments();
}, 5000);
})
.then(payload => console.log('Payload resolved', payload))
.catch(error => {
console.error('Error creating the Xumm payload:', error);
});
}
    var xhr = new XMLHttpRequest();
xhr.open("POST", "/includes/update_payment.inc.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// Define the data to be sent in the AJAX request
var requestData = "purchasee=" + encodeURIComponent(localStorage.getItem("username")) +
"&project=" + encodeURIComponent("Shinkad") +
"&purcharser=" + encodeURIComponent(localStorage.getItem("name")) + 
"&amount="+ encodeURIComponent(document.getElementById("Amount").value);

console.log(requestData);

xhr.onreadystatechange = function () {
if (xhr.readyState == 4 && xhr.status == 200) {
// Print the response from the server to the console
console.log(xhr.responseText);
console.log("done")

// You can also display the response on the screen if needed
var responseElement = document.getElementById("response");
if (responseElement) {
    responseElement.innerHTML = xhr.responseText;
}
}
};
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}
// Send the AJAX request
sleep(2000).then(() => {xhr.send(requestData);});

    var email = localStorage.getItem('email');

var inputBox = document.getElementById('Amount');
var price = ""
inputBox.onkeyup = function () {
price = parseFloat(inputBox.value) * 12.41; // Use parseFloat to handle decimal input
price = price * 1.78; 
price = price.toFixed(0);; // Round the price to 2 decimal places
//price = trunc(price);
console.log(price);
document.getElementById('ammountablel').innerHTML = price + " XRP";
}

    var inputBox = document.getElementById('Amount');
    var image = document.getElementById("qrCode");
    image.style.display = "none";