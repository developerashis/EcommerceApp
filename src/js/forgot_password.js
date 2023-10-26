document.getElementById("forgotPasswordForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting

    var email = document.getElementById("email").value;

    // Get the existing user data from local storage or initialize an empty array
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the provided email exists in the local storage
    var userFound = users.find(function(user) {
        return user.email === email;
    });

    if (userFound) {
        // Simulate sending a password reset link (you can implement this functionality on your server).
        // In a real application, you would send an email with a unique reset link to the user.
        document.getElementById("resetMessage").innerHTML = "Password reset link sent to your email.";
        document.getElementById("resetMessage").style.display = "block";
    } else {
        document.getElementById("resetMessage").innerHTML = "Email not found. Invalid Email.";
        document.getElementById("resetMessage").style.display = "block";
    }
});