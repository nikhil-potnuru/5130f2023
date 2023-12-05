// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (replace 'your_database_url' with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });

// Define user schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  verificationToken: { type: String },
  verified: { type: Boolean, default: false },
});

// Create user model
const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Generate a verification token (for simplicity, using a random string here)
    const verificationToken = Math.random().toString(36).substring(7);

    // Create a new user
    const newUser = new User({
      email,
      password,
      verificationToken,
      verified: false,
    });

    // Save the new user to the database
    await newUser.save();

    // Send verification email (replace with actual email sending logic)

    res.json({ success: true, message: 'Signup successful. Check your email for verification.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/verify', async (req, res) => {
  const { token } = req.query;

  try {
    // Find the user with the matching verification token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid verification token' });
    }

    // Mark the user as verified
    user.verified = true;

    // Update the user in the database
    await user.save();

    res.json({ success: true, message: 'Email verification successful. You can now sign in.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
