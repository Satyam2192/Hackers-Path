"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from './component/redux/store';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // New state to prevent premature redirection

  useEffect(() => {
    // Check token in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setIsCheckingAuth(false); // Stop checking once we have the token status
  }, []);

  useEffect(() => {
    if (isCheckingAuth) return; // Avoid redirecting during the token check

    const protectedRoutes = ['/learn', '/resetpassword'];

    if (!isLoggedIn && (protectedRoutes.includes(pathname) || pathname.startsWith('/learn/'))) {
      router.push(`/login?redirecturl=${encodeURIComponent(pathname)}`);
    }
  }, [isLoggedIn, pathname, router, isCheckingAuth]);

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

