        document.getElementById("registrationForm").addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent the form from submitting

            // Get the input values
            var username = document.getElementById("username").value;
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;

            // Get the existing user data from local storage or initialize an empty array
            var users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if the username already exists
            var isUsernameTaken = users.some(function (user) {
                return user.username === username;
            });

            if (isUsernameTaken) {
                alert("Username already exists. Please choose a different username or login using existing credential");
            } else {
                // Create a user object
                var user = {
                    username: username,
                    email: email,
                    password: password
                };

                // Add the new user to the array
                users.push(user);

                // Store the updated user data back in local storage
                localStorage.setItem("users", JSON.stringify(users));

                // Clear the form
                document.getElementById("registrationForm").reset();

                alert("Registration successful!.");

                // Redirect to the login page
                window.location.href = "login.html";
            }
        });