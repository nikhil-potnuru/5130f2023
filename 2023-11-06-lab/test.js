// Import the required module
const readline = require('readline');

// Create an interface to read input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Regular expression for well-formed email addresses
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regular expression for phone numbers in various formats
const phoneRegex = /(\+\d{1,2}\s?)?(\d{3}[-\s]?\d{3}[-\s]?\d{4}|\(\d{3}\)\s?\d{3}[-\s]?\d{4}|\d{10})/;

// Regular expression for URL's in various formats
const urlRegex = /(http|https):\/\/www\.[a-zA-Z0-9.-]+\.(com|org|edu|io)/;

// Function to validate input against the regular expressions
function validateInput(input) {
  if (emailRegex.test(input)) {
    console.log(`Valid Email Address: ${input}`);
  } else if (phoneRegex.test(input)) {
    console.log(`Valid Phone Number: ${input}`);
  } else if (URLRegex.test(input)) {
    console.log(`Valid URL: ${input}`);
  } else {
    console.log(`Invalid input: ${input}`);
  }
}

// Prompt the user for input
rl.question('Enter an email address or phone number or URL: ', (input) => {
  validateInput(input);
  rl.close();
});
