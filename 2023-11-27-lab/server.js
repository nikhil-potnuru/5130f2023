// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory user data (replace with a database in a production environment)
const users = [];

app.use(bodyParser.json());

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;

  // Check if the email is already registered
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  // Generate a verification token (for simplicity, using a random string here)
  const verificationToken = Math.random().toString(36).substring(7);

  // Save user data (replace with database storage in production)
  users.push({ email, password, verificationToken, verified: false });

  // Send verification email (replace with actual email sending logic)

  res.json({ success: true, message: 'Signup successful. Check your email for verification.' });
});

app.get('/api/verify', (req, res) => {
  const { token } = req.query;

  // Find the user with the matching verification token
  const user = users.find(u => u.verificationToken === token);

  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid verification token' });
  }

  // Mark the user as verified (replace with database update in production)
  user.verified = true;

  res.json({ success: true, message: 'Email verification successful. You can now sign in.' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
