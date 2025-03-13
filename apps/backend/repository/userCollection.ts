import { firestore } from '../config/firebaseConfig';
import { User, UserUpdateRequest } from 'shared';

const USERS_COLLECTION = 'USERS';

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await firestore.collection(USERS_COLLECTION).doc(userId).get();
    
    if (!userDoc.exists) {
      return null;
    }
    
    return { id: userDoc.id, ...userDoc.data() } as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: UserUpdateRequest): Promise<User> => {
  try {
    const updateData = {
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    await firestore.collection(USERS_COLLECTION).doc(userId).update(updateData);
    
    // Get the updated user
    const updatedUser = await getUserById(userId);
    if (!updatedUser) {
      throw new Error('User not found after update');
    }
    
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
