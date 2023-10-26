// Your existing JavaScript code here

const products = [
    { id: 1, name: "Canon EOS 6D Mark II DSLR Camera Body with Single Lens: EF24-105mm f/4L IS II USM  (Black)", price: 31000.00, image: "../imgs/product-1.jpg" },
    { id: 2, name: "Essential Basics Men's Half Sleeves T-Shirt - The Perfect Wardrobe Staple for Men", price: 1299.00, image: "../imgs/product-2.jpg" },
    { id: 3, name: "Homesake Antique Solid Timber Turned Table Lamp", price: 1239.99, image: "../imgs/product-3.jpg" },
    { id: 4, name: "Nike Mens Revolution 6 Nn |Sports Shoes-Men Sneaker", price: 4999.00, image: "../imgs/product-4.jpg" },
    { id: 5, name: "Foldable Remote Control Drone with Camera HD Wide Angle Lens Optical Flow Positioning with 1800Mah Battery WiFi FPV 4-Axis Camera with Dual Flash Lights", price: 4559.00, image: "../imgs/product-5.jpg" },
    { id: 6, name: "Newly Launched Mettalix: 1.4 HD Display with Metallic Straps and Stainless Steel Finish, BT Calling, Functional Crown, 7 Day Battery, Smart Watch for Men and Women", price: 8359.00, image: "../imgs/product-6.jpg" }
];



const recommendedProducts = [
    { id: 6, name: "Girls Bell Sleeves 3 Button Top-3", price: 1339.00, image: "../imgs/product-7.jpg" },
    { id: 7, name: "Lightly foaming face wash - Pack of 3", price: 1720.00, image: "../imgs/product-8.jpg" },
    { id: 8, name: "Premium Leatherette, Office Chair", price: 7000.00, image: "../imgs/product-9.jpg" }
];

// Function to create a product card
function createProductCard(product) {
    // Create and return the product card
    const productCard = document.createElement("div");
    productCard.className = "product";
    productCard.innerHTML = `
        <h5>${product.name}</h5>
        <img src="${product.image}" alt="${product.name}">
        <p>Price: &#8377 ${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    return productCard;
}


// Function to create a recommended product card
function createRecommendedProductCard(product) {
    // Create and return the recommended product card
    const productCard = document.createElement("div");
    productCard.className = "product";
    productCard.innerHTML = `
        <h5>${product.name}</h5>
        <img src="${product.image}" alt="${product.name}">
        <p>Price: &#8377 ${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    return productCard;
}


// Function to initialize the product catalog
function initialize() {
    for (const product of products) {
        const productCard = createProductCard(product);
        productList.appendChild(productCard);
    }

    for (const product of recommendedProducts) {
        const productCard = createRecommendedProductCard(product);
        recommendedProductList.appendChild(productCard);
    }
}

// Function to update the cart count in the header
function updateCartCount(cart) {
    const cartCount = document.getElementById("cartCount");
    cartCount.textContent = cart.length;
}

// Function to initialize the shopping cart
function initializeCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount(cart);
}

// Function to open the cart modal
// Function to open the cart modal
function openCartModal() {
    const modal = document.getElementById("cartModal");
    modal.style.display = "block";

    // Retrieve the cart items from local storage and display them
    const cartItemsList = document.getElementById("cartItemsList");
    const proceedToCheckoutButton = document.getElementById("proceedToCheckout");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        // If the cart is empty, display a message and hide the "Proceed to Checkout" button
        cartItemsList.innerHTML = "<p>No items in the cart.</p>";
        proceedToCheckoutButton.style.display = "none";
    } else {
        // Otherwise, display the cart items and show the "Proceed to Checkout" button
        cartItemsList.innerHTML = "";

        // Create cart items
        for (const item of cart) {
            const cartItem = createCartItem(item);
            cartItemsList.appendChild(cartItem);
        }
        proceedToCheckoutButton.style.display = "block";
    }

    // Update the cart total
    updateCartTotal(cart);
}




// Function to create a cart item
function createCartItem(item) {
    const taxRate = 0.10; // 10% tax rate
    const taxAmount = (item.price * taxRate) * item.quantity;
    const itemPriceWithoutTax = (item.price - (item.price * taxRate));
    const totalPrice = item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="item-image">
        <div class="item-details">
            <span class="item-name">${item.name}</span>
            <span class="item-price">&#8377 ${itemPriceWithoutTax.toFixed(2)}</span>
            <span class="item-quantity">Qty: ${item.quantity}</span>
            <span class="item-tax">(10% Incl. Tax: &#8377 ${taxAmount.toFixed(2)})</span>
            <span class="item-total">Item Total : &#8377  ${totalPrice.toFixed(2)}</span>
        </div>
        <button class="remove-button" onclick="removeFromCart(${getCartItemIndex(item)})">Remove</button>
    `;
    return cartItem;
}

// Function to calculate the cart total
function calculateCartTotal(cart) {
    let total = 0;
    for (const item of cart) {
        total += item.price * item.quantity;
    }
    return total;
}

// Function to update the cart total in the cart modal
function updateCartTotal(cart) {
    const cartTotal = document.getElementById("cartTotal");
    const total = calculateCartTotal(cart);
    const totalText = total.toFixed(2);
    cartTotal.textContent = "Cart Total : " + totalText ;
}

// Function to get the index of a cart item
function getCartItemIndex(item) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.findIndex(cartItem => cartItem.id === item.id);
}

// Function to close the cart modal
function closeCartModal() {
    const modal = document.getElementById("cartModal");
    modal.style.display = "none";
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products[productId];

    if (product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the product is already in the cart
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            // If the product already exists, increment the quantity
            existingItem.quantity += 1;
        } else {
            // If it's a new product, add it to the cart with quantity 1
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // Update the cart count and refresh the cart modal
        updateCartCount(cart);
        //openCartModal();
    }
}

// Function to remove a product from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update the cart count
        updateCartCount(cart);

        // Update the cart modal to reflect the removal
        openCartModal();
    }
}

function handleLogout() {
    // Remove the user data from localStorage
    localStorage.removeItem("username");

    // Redirect to the login page
    window.location.href = "../pages/login.html";
}

function handleLogin() {

    // Redirect to the login page
    window.location.href = "../pages/login.html";
}

function switchLoginLogout(){
    // Retrieve the username from localStorage
const username = localStorage.getItem("username");

// Get references to the login and logout buttons
const loginButton = document.getElementById("loginButton");

const logoutButton = document.getElementById("logoutButton");

const userNameElement = document.getElementById("userName");

    if (username) {
        // User is logged in
        userNameElement.textContent = "Welcome, " + username + " !";

        // Hide the login button and show the logout button
        if (loginButton) {
            loginButton.style.display = "none";
        }
        if (logoutButton) {
            logoutButton.style.display = "block";
        }
    } else {
        // User is not logged in, hide the logout button
        if (logoutButton) {
            logoutButton.style.display = "none";
        }
        if(loginButton)
            loginButton.style.display = "block";
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the page when the DOM is fully loaded
    initialize();
    initializeCart();

    switchLoginLogout();
});

// Event listener to open the cart modal when clicking on the cart icon
const cartLink = document.getElementById("cartLink");
cartLink.addEventListener("click", function (event) {
    event.preventDefault();
    openCartModal();
});

// Event listener to close the cart modal when clicking the close button
document.getElementById("closeCartModal").addEventListener("click", closeCartModal);

// Event listener for the "Proceed to Checkout" button
document.getElementById("proceedToCheckout").addEventListener("click", function () {
    // Handle checkout logic (e.g., redirect to checkout page)
    // Your checkout logic here
    window.location.href = "../pages/checkout.html";
});

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", handleLogin);

const logoutButton = document.getElementById("logoutButton");
 logoutButton.addEventListener("click", handleLogout);
