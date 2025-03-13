'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import UserUpdateForm from '../../components/organisms/UserUpdateForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export default function ProfilePage() {
  const router = useRouter();

  React.useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold">User Profile</h1>
        
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Manage Your Profile</CardTitle>
            <CardDescription>View or edit your user information</CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">User Information</TabsTrigger>
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="p-4">
              <div className="flex flex-col items-center space-y-4">
                <p className="text-center text-muted-foreground">
                  View your profile information on the main dashboard
                </p>
                <Button 
                  onClick={() => router.push('/')}
                  className="mt-4"
                >
                  Go to Dashboard
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="edit">
              <CardContent>
                <UserUpdateForm />
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
