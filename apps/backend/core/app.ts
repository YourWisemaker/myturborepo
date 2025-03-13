import express, { Express } from 'express';
import cors from 'cors';
import userRoutes from '../routes/userRoutes';

const createApp = (): Express => {
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

  // Apply middleware
  app.use(cors(corsOptions));
  app.use(express.json());
  
  // Apply routes
  app.use('/api/user', userRoutes);
  
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
  });

  return app;
};

export default createApp;
