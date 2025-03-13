// Simple Express server for local development
const express = require('express');
const cors = require('cors');

// Create Express server
const app = express();

// Configure CORS with specific allowed origins
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5000',
    'http://localhost:5173', // Vite default port
    'https://yourdomain.com', // Replace with your production domain
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours in seconds
};

app.use(cors(corsOptions));
app.use(express.json());

// Add your routes directly
app.get('/api/users', (req, res) => {
  // Example endpoint
  res.json({ users: [] });
});

// Add more routes as needed

// Try different ports if the default one is in use
const startServer = (port) => {
  const server = app.listen(port)
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use, trying port ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    })
    .on('listening', () => {
      const actualPort = server.address().port;
      console.log(`Local development server running on http://localhost:${actualPort}`);
      console.log(`API available at http://localhost:${actualPort}/api`);
    });
};

// Start with port 5001 and try incrementing if it's in use
startServer(5001);
