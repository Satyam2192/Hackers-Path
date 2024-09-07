"use client";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from './component/redux/store';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const protectedRoutes = ['/learn', '/learn/[id]', '/contact', '/resetpassword']; // Add other protected routes here

    if (!isLoggedIn && protectedRoutes.includes(router.pathname)) {
      router.push('/login'); // Redirect to login if not logged in
    }
  }, [isLoggedIn, router]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}