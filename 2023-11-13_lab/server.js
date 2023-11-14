// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const twilio = require('twilio');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy in-memory storage for user data
const users = [];
const secret = speakeasy.generateSecret();

// Nodemailer configuration (use your own email service credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    // Perform server-side validation (not implemented in this example)
    if (!email || !password) {
        return res.status(400).send('Invalid email or password');
    }

    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).send('User already exists');
    }

    // Generate a unique verification token (for simplicity, use a random string)
    const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Store the user in the in-memory database with the verification token
    users.push({ email, password, verified: false, verificationToken });

    // Send a verification email
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Click the following link to verify your email: http://localhost:3000/verify/${verificationToken}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
        res.status(201).send('Signup successful! Please check your email for verification.');
    } catch (error) {
        console.error('Error sending verification email:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/verify/:token', (req, res) => {
    const token = req.params.token;

    // Find the user with the given verification token
    const user = users.find(u => u.verificationToken === token);

    if (!user) {
        return res.status(404).send('Invalid verification token');
    }

    // Mark the user as verified
    user.verified = true;

    // Remove the verification token (optional, as it's no longer needed)
    user.verificationToken = null;

    console.log('User verified:', user.email);
    res.status(200).send('Email verification successful! You can now log in.');
});

app.post('/create-profile', async (req, res) => {
    const { username, email, bio } = req.body;
  
    try {
      const newUser = await User.create({ username, email, bio });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user profile:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/user-profiles', async (req, res) => {
    try {
      const profiles = await User.find();
      res.json(profiles);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
      res.status(500).send('Internal Server Error');
    }
  });

const accountSid = 'AC92a092ddb480af92d1af47c77a5f01b2';
const authToken = '0f0295ae60b61cdfe2b6178b8a4bc95a';
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = '16179537352';

app.post('/enable-2fa', (req, res) => {
    const { username } = req.body;
  
    // Generate a new secret for the user
    const userSecret = speakeasy.generateSecret();
    users[username] = { secret: userSecret.base32, verified: false };
  
    // Send SMS with verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const message = `Your verification code is: ${verificationCode}`;
    
    twilioClient.messages
      .create({
        body: message,
        from: twilioPhoneNumber,
        to: 'user-phone-number', // Replace with the user's phone number
      })
      .then(() => {
        res.send('2FA enabled. Check your phone for the verification code.');
      })
      .catch((error) => {
        console.error('Error sending SMS:', error);
        res.status(500).send('Error sending SMS');
      });
  });

  app.post('/verify-2fa', (req, res) => {
    const { username, code } = req.body;
    const user = users[username];
  
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    // Verify TOTP code
    const isValidCode = speakeasy.totp.verify({
      secret: user.secret,
      encoding: 'base32',
      token: code,
    });
  
    if (isValidCode) {
      user.verified = true;
      res.send('2FA verification successful. TOTP is now enabled.');
    } else {
      res.status(401).send('Invalid verification code');
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
