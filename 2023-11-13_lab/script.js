// script.js
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM content loaded');
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Signup form submitted');
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Perform client-side validation
        if (!isValidEmail(email) || !isValidPassword(password)) {
            alert('Invalid email or password format.');
            return;
        }

        // Send the data to the server (not implemented in this example)
        console.log('Sending signup data to the server:', { email, password });
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Login form submitted');
        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;

        // Perform client-side validation
        if (!isValidEmail(loginEmail) || !isValidPassword(loginPassword)) {
            alert('Invalid email or password format.');
            return;
        }

        // Send the data to the server (not implemented in this example)
        console.log('Sending login data to the server:', { loginEmail, loginPassword });
    });

    function isValidEmail(email) {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPassword(password) {
        // Password must have at least 8 characters, including upper/lowercase, digit, and symbol
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
        return passwordRegex.test(password);
    }
});
