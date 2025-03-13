// Simple development server to avoid Firebase emulator and TypeScript compilation issues
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

// Configure CORS as mentioned in the memories
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:5173',
    // Add production domain when available
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));
app.use(express.json());

// Mock user data for development
const mockUser = {
  id: 'user123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  createdAt: Date.now() - 1000000,
  updatedAt: Date.now() - 500000
};

// Mock API endpoint to fetch user data
app.get('/api/fetch-user-data', (req, res) => {
  // Simulate authentication check
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Simulate delay
  setTimeout(() => {
    res.json({ user: mockUser });
  }, 500);
});

// Mock API endpoint to update user data
app.post('/api/update-user-data', (req, res) => {
  // Simulate authentication check
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const updatedUser = req.body;
  // Merge with existing mock data
  Object.assign(mockUser, updatedUser);
  // Update the timestamp
  mockUser.updatedAt = Date.now();

  // Simulate delay
  setTimeout(() => {
    res.json({ user: mockUser });
  }, 500);
});

// Start server
app.listen(PORT, () => {
  console.log(`Development server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET /api/fetch-user-data');
  console.log('  POST /api/update-user-data');
});
