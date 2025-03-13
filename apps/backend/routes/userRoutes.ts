import { Router } from 'express';
import { fetchUserData, updateUserData } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Apply auth middleware to all user routes
router.use(authMiddleware);

// Route to fetch user data
router.get('/fetch-user-data', fetchUserData);

// Route to update user data
router.post('/update-user-data', updateUserData);

export default router;
