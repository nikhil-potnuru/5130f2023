// app.js

function signUp() {
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    if (!validateEmail(email)) {
        alert('Invalid email format');
        return;
    }

    // Send signup data to the server
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Signup successful. Check your email for verification.');
        } else {
            alert('Signup failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function verifyEmail(token) {
    // Send the verification token to the server for validation
    fetch(`/api/verify?token=${token}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Email verification successful. You can now sign in.');
        } else {
            alert('Email verification failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
