document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting

    // Get the entered username and password
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve user data from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if a user with the provided username and password exists
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Successful login
        document.getElementById("loginMessage").innerHTML = "Login successful.";
        document.getElementById("loginMessage").style.display = "block";

        const username = document.getElementById("username").value;

        // Store the username in localStorage
        localStorage.setItem("username", username);
        
        // Redirect to the product list page (replace with your actual product list page path)
        setTimeout(() => {
            window.location.href = "../pages/index.html";
        }, 1000);
    } else {
        // Login failed
        document.getElementById("loginMessage").innerHTML = "Invalid username or password.";
        document.getElementById("loginMessage").style.display = "block";
    }
});