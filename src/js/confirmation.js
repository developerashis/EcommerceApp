document.addEventListener("DOMContentLoaded", function () {
    // Get references to HTML elements
    const orderTable = document.getElementById("orderedTable").getElementsByTagName('tbody')[0];
    const shippingInfoContainer = document.getElementById("shippingInfoContainer");
    const paymentInfoContainer = document.getElementById("paymentInfoContainer");

    // Function to retrieve order details from local storage
    function getOrderDetails() {
        const order = JSON.parse(localStorage.getItem("order"));

        if (order) {
            const orderItems = order.items;
            const taxRate = 0.10; // 10% tax rate

            orderTable.innerHTML = "";

            // Populate the table with ordered items
            orderItems.forEach(item => {
                const taxAmount = (item.price * taxRate) * item.quantity;
                const itemPriceWithoutTax = (item.price - (item.price * taxRate));
                const totalPrice = item.price * item.quantity;
                const row = orderTable.insertRow(orderTable.rows.length);
                row.innerHTML = `
                    <td><img src="${item.image}" alt="${item.name}"></td>
                    <td>${item.name}</td>
                    <td>&#8377 ${itemPriceWithoutTax.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>&#8377 ${taxAmount.toFixed(2)}</td>
                    <td>&#8377 ${totalPrice.toFixed(2)}</td>
                `;
            });

            // Display shipping information
            const shippingInfo = order.shippingInfo;
            const shippingInfoHTML = `
                <h2>Shipping Information</h2>
                <p>Name: ${shippingInfo.name}</p>
                <p>Address: ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zip}, ${shippingInfo.country}</p>
            `;
            shippingInfoContainer.innerHTML = shippingInfoHTML;

            // Display payment information
            const paymentInfo = order.paymentInfo;
            const paymentInfoHTML = `
                <h2>Payment Information</h2>
                <p>Card Number: ${paymentInfo.cardNumber}</p>
                <p>Type: ${paymentInfo.type}</p>
                <p>TransactionNumber: ${paymentInfo.transactionNumber}</p>
                <p>Date: ${paymentInfo.date}</p>
            `;
            paymentInfoContainer.innerHTML = paymentInfoHTML;
        }
    }

    // Call the function to retrieve and display order details
    getOrderDetails();
});
