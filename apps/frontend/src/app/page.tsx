'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUser } from '../store/slice/userSlice';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, success } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    // Fetch user data on page load
    dispatch(fetchUser());
  }, [dispatch, router]);

  const handleFetchUser = () => {
    dispatch(fetchUser());
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold">User Profile</h1>

        <div className="w-full max-w-2xl bg-card rounded-lg border shadow-sm p-6">
          {loading && (
            <div className="flex justify-center my-6">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md mb-4">
              Operation completed successfully!
            </div>
          )}

          {user ? (
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">ID:</div>
                  <div className="col-span-2">{user.id}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">Name:</div>
                  <div className="col-span-2">{user.firstName} {user.lastName}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">Email:</div>
                  <div className="col-span-2">{user.email}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">Created:</div>
                  <div className="col-span-2">
                    {new Date(user.createdAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold">Last Updated:</div>
                  <div className="col-span-2">
                    {new Date(user.updatedAt).toLocaleString()}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push('/profile')}>
                  Edit Profile
                </Button>
                <Button onClick={handleFetchUser} disabled={loading}>
                  {loading ? 'Loading...' : 'Refresh Data'}
                </Button>
              </CardFooter>
            </Card>
          ) : !loading && (
            <div className="text-center text-muted-foreground py-4">
              <p>No user data available. Click the button below to fetch user data.</p>
            </div>
          )}

          {!user && !loading && (
            <div className="flex justify-center mt-6">
              <Button onClick={handleFetchUser}>
                Fetch User Data
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
