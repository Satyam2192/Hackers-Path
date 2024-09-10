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

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const protectedRoutes = ['/learn', '/resetpassword']; 

    if (!isLoggedIn && (protectedRoutes.includes(pathname) || pathname.startsWith('/learn/'))) {
      router.push('/login'); 
    }
  }, [isLoggedIn, pathname, router]);

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