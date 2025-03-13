import { Request, Response } from 'express';
import { getUserById, updateUser } from '../repository/userCollection';
import { UserUpdateRequest, UserResponse } from 'shared';

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.uid) {
      return res.status(401).json({
        success: false,
        error: 'User ID not available'
      });
    }

    const userId = req.user.uid;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const response: UserResponse = {
      success: true,
      data: user,
      message: 'User data fetched successfully'
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.uid) {
      return res.status(401).json({
        success: false,
        error: 'User ID not available'
      });
    }

    const userId = req.user.uid;
    const userData: UserUpdateRequest = req.body;

    // Validate request body
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No update data provided'
      });
    }

    // Update user in Firestore
    const updatedUser = await updateUser(userId, userData);

    const response: UserResponse = {
      success: true,
      data: updatedUser,
      message: 'User data updated successfully'
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
