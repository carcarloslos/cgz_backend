const express = require('express');
const WebSocket = require('ws');
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

// Create HTTP server from Express app
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${server.address().port}`);
});

// Set up WebSocket server to handle WebSocket connections
const wss = new WebSocket.Server({ server });

// Handle incoming WebSocket connections
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  // Send a welcome message to the new client
  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

  // Handle incoming messages from WebSocket clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // You can handle specific messages here. For example, increment counter:
    if (message === 'increment') {
      counter += 1;
      // Notify all connected WebSocket clients about the updated counter value
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ counter }));
        }
      });
    }
  });

  // Handle WebSocket connection closure
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

