// invoiceScript.js

function sendInvoiceData() {
    const table = document.getElementById("invoiceItems");
    const invoicedata = [];

    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const item = {
            itemName: row.cells[0].textContent,
            itemDescription: row.cells[1].textContent,
            quantity: row.cells[2].textContent,
            price: row.cells[3].textContent,
            itemTotal: row.cells[4].textContent
        };
        invoicedata.push(item);
    }

    const data = {
        clientName: document.getElementById("clientName").value,
        invoiceDate: document.getElementById("invoiceDate").value,
        clientEmail: document.getElementById("clientEmail").value,
        total: document.getElementById("total").textContent,
        items: invoicedata
    };

    const jsonData = JSON.stringify(data);

    fetch('/includes/Sendemail.inc.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
}
