
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the public folder (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));



// Define route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define route to serve contact.html from templates folder
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'contact.html'));
});


// Define route to serve about.html from templates folder
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'about.html'));
});


// Define route to serve login.html from templates folder
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'login.html'));
});


// Define route to serve newaccount.html from templates folder
app.get('/newaccount', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'newaccount.html'));
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});





