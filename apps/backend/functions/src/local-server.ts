import express from 'express';
import cors from 'cors';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin (using service account or default credentials)
try {
  admin.initializeApp();
} catch (error) {
  console.log('Firebase admin already initialized or error:', error);
}

// Import your API routes
import './index';

// Create a simple Express server for local development
const app = express();

// Configure CORS with specific allowed origins
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5000',
    'http://localhost:5173',
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
app.get('/api/users', async (req, res) => {
  // Example endpoint
  res.json({ users: [] });
});

// Add more routes as needed

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Local development server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
