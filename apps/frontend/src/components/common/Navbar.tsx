'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { logoutUser } from '../../store/slice/userSlice';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ui/theme-toggle';

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(logoutUser());
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">My App</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link 
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            {user && (
              <Link 
                href="/profile"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Profile
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Log out
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => router.push('/login')}>
              Log in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
