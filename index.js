const express = require('express');
const app = express();
let counter = 0;

// Serve static files
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
