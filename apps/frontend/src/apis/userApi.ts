import { UserResponse, UserUpdateRequest } from '../types/shared';
import apiClient from './apiClient';

// Fetch user data from the backend
export const fetchUserData = async (): Promise<UserResponse> => {
  try {
    const response = await apiClient.get<UserResponse>('/user/fetch-user-data');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Update user data in the backend
export const updateUserData = async (userData: UserUpdateRequest): Promise<UserResponse> => {
  try {
    const response = await apiClient.post<UserResponse>('/user/update-user-data', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};
