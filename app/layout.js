'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import './globals.css';

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if token cookie exists
    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const hasToken = cookies.some(cookie => cookie.trim().startsWith('token='));
      console.log('Auth check:', { cookies, hasToken }); // Debug log
      setIsAuthenticated(hasToken);
    };

    checkAuth();
    // Set up an interval to check auth status periodically
    const interval = setInterval(checkAuth, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Important: include credentials
      });

      if (response.ok) {
        setIsAuthenticated(false);
        router.push('/');
        router.refresh(); // Refresh the page to update the server components
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <html lang="en">
      <body>
        <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
          <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
          <Link href="/recipes" style={{ marginRight: '1rem' }}>Recipes</Link>
          <Link href="/bookmarks" style={{ marginRight: '1rem' }}>Bookmarks</Link>
          <Link href="/add-recipe" style={{ marginRight: '1rem' }}>Add Recipe</Link>
          <Link href="/profile" style={{ marginRight: '1rem' }}>Profile</Link>
          <Link href="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            style={{ color: '#dc2626' }}
          >
            Logout
          </Link>
        </nav>
        <div style={{ padding: '1rem' }}>
          {children}
        </div>
      </body>
    </html>
  );
}