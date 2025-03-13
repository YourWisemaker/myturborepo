import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';

admin.initializeApp();

const app = express();

// Configure CORS with specific allowed origins
const corsOptions = {
  origin: [
    'http://localhost:3000',
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

// Your API routes here
app.get('/api/users', async (req, res) => {
  // Example endpoint
  res.json({ users: [] });
});

export const api = functions.https.onRequest(app);