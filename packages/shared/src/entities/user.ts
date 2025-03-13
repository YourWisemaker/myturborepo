export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  data?: User;
  error?: string;
}
