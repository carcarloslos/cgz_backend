const express = require('express');
const app = express();
let counter = 0;
let namesList = [];  // List to store names

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

// API endpoint to get the current counter value
app.get('/counter', (req, res) => {
  res.json({ counter });
});

// API endpoint to increment the counter
app.post('/increment', (req, res) => {
  counter += 1;
  res.json({ counter });
});

// API endpoint to get the list of names
app.get('/names', (req, res) => {
  res.json({ names: namesList });
});

// API endpoint to add a name to the list
app.post('/add-name', (req, res) => {
  const name = req.body.name;
  if (name && !namesList.includes(name)) {
    namesList.push(name);  // Add name to the list
    res.json({ message: 'Name added', names: namesList });
  } else {
    res.status(400).json({ message: 'Invalid or duplicate name' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
