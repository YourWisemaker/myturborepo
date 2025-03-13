'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { updateUser } from '../../store/slice/userSlice';
import { User } from '../../types/shared';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

const UserUpdateForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.user);
  
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Update form data when user data is loaded
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (user && formData) {
      const updatedUser: User = {
        ...user,
        ...formData,
        updatedAt: Date.now()
      };

      try {
        await dispatch(updateUser(updatedUser)).unwrap();
        setSuccess(true);
        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  if (!user) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No user data available. Please fetch user data first.
      </div>
    );
  }

  return (
    <div>
      <CardHeader>
        <CardTitle>Update User Information</CardTitle>
        <CardDescription>Make changes to your profile here</CardDescription>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md mb-4">
            User information updated successfully!
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Updating...
                </>
              ) : 'Update Profile'}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default UserUpdateForm;
