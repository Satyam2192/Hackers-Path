"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from './component/redux/store';
import Navbar from "@/app/component/Navbar/Navbar";
import Footer from "@/app/component/Footer";
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setIsCheckingAuth(false); // Stop checking once we have the token status
    }, []);

    useEffect(() => {
        if (isCheckingAuth) return;

        const protectedRoutes = ['/learn', '/resetpassword'];

        if (!isLoggedIn && (protectedRoutes.includes(pathname) || pathname.startsWith('/learn/'))) {
            console.log('Redirecting to login...');
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
