import * as functions from 'firebase-functions';
import createApp from './core/app';

// Create Express app
const app = createApp();

// Export for Firebase Functions
export const api = functions.https.onRequest(app);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
  });
}
