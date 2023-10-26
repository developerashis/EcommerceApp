document.addEventListener("DOMContentLoaded", function () {
    // Get references to HTML elements
    const cartTable = document.getElementById("cartTable").getElementsByTagName('tbody')[0];

    // Function to retrieve cart items from local storage
    function getCartItems() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    // Function to calculate tax-inclusive price
    function calculateTaxInclusivePrice(price) {
        const taxRate = 0.10; // 10% tax rate
        return price + price * taxRate;
    }

    // Function to populate cart items in the table
    function populateCartItems() {
        const taxRate = 0.10; // 10% tax rate
    
        const cartItems = getCartItems();
        if (cartItems.length === 0) {
            // If the cart is empty, display a message
            cartTable.innerHTML = "<tr><td colspan='5'>Your cart is empty.</td></tr>";
        } else {
            // Iterate through the cart items and create table rows
            cartTable.innerHTML = "";
            cartItems.forEach((item) => {
                const taxAmount = (item.price * taxRate) * item.quantity;
                const itemPriceWithoutTax = (item.price - (item.price * taxRate));
                const totalPrice = item.price * item.quantity;
                const row = cartTable.insertRow(cartTable.rows.length);
                row.innerHTML = `
                    <td><img src="${item.image}" alt="${item.name}"></td>
                    <td>${item.name}</td>
                    <td>&#8377 ${itemPriceWithoutTax.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>&#8377 ${taxAmount.toFixed(2)}</td>
                    <td>&#8377 ${totalPrice.toFixed(2)}</td>
                `;
            });
        }
    }

    // Call the function to populate cart items on page load
    populateCartItems();

     // Get references to HTML elements
     
     const checkoutButton = document.getElementById("checkoutButton");
 
     // Function to handle the checkout process
     function handleCheckout(event) {
        event.preventDefault(); // Prevent the default form submission behavior


        // Get form input values
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const zip = document.getElementById("zip").value;
        const country = document.getElementById("country").value;
        const cardNumber = document.getElementById("cardNumber").value;
        const expDate = document.getElementById("expDate").value;
        const cvv = document.getElementById("cvv").value;

        if (!name || !address || !city || !zip || !country) {
            alert("Please fill in all shipping address fields.");
        } else if (!cardNumber || !expDate || !cvv || !isValidCardNumber(cardNumber) || !isValidExpDate(expDate)) {
            alert("Please enter valid payment details.");
        }
        else{
            const shippingData = {
                name: name,
                address: address,
                city: city,
                zip: zip,
                country: country,
            };
    
            const paymentData = {
                cardNumber: cardNumber,
                expDate: expDate,
                cvv: cvv,
            };
       
         const transactionNumber = generateTransactionNumber(paymentData);
         const paymentInfo = {
            cardNumber: cardNumber,
            type: "Credit Card",
            transactionNumber: transactionNumber,
            date: new Date().toJSON()
        };
          // Retrieve cart items
          const cartItems = getCartItems();

          // Create an order object
          const order = {
              orderNumber: generateRandomOrderNumber(),
              shippingInfo: shippingData,
              paymentInfo: paymentInfo,
              items: cartItems,
              orderDate: new Date().toJSON(),
          };
  
          // Store the order in local storage
          localStorage.setItem("order", JSON.stringify(order));
         
         // You can also clear the cart items from local storage if needed
         localStorage.removeItem("cart");

         // After a successful response from the server, you can redirect the user to a confirmation page.
         window.location.href = "../pages/confirmation.html";
        }
     }

      // Function to validate card number (you can customize this function)
    function isValidCardNumber(cardNumber) {
        // Implement card number validation logic (e.g., Luhn algorithm)
        // Return true if valid, false if not
        return true; // Replace with actual validation logic
    }

    // Function to validate expiration date (you can customize this function)
    function isValidExpDate(expDate) {
        // Implement expiration date validation logic (e.g., check format and expiry)
        // Return true if valid, false if not
        return true; // Replace with actual validation logic
    }
    
     function generateTransactionNumber(paymentData) {
        // call payment api and generate a transaction number.

        // Get relevant payment information
        const cardNumber = paymentData.cardNumber;
    
        // Generate a timestamp (you can use a more precise timestamp mechanism)
        const timestamp = new Date().getTime();
    
        // Combine the card number and timestamp to create a unique transaction number
        const transactionNumber = `${cardNumber.slice(-4)}-${timestamp}`;
    
        return transactionNumber;
    }

    function generateRandomOrderNumber() {
        // Call api and generate order number

        // Generate a random 6-digit number
        const randomDigits = Math.floor(100000 + Math.random() * 900000);
    
        // Get the current timestamp (in milliseconds since the epoch)
        const timestamp = new Date().getTime();
    
        // Combine the random number and timestamp to create a unique order number
        const orderNumber = `ORD-${randomDigits}-${timestamp}`;
    
        return orderNumber;
    }
     // Event listener for the "Checkout" button
     checkoutButton.addEventListener("click", function (event) {
         handleCheckout(event);
     });
});
