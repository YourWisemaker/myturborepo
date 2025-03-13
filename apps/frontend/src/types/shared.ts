export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: number;
  updatedAt: number;
}

export interface UserUpdateRequest extends Partial<User> {
  id: string;
}

export interface UserResponse {
  success: boolean;
  data?: User;
  error?: string;
}
