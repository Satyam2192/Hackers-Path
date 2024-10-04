"use client";

import './globals.css';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';


export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setIsCheckingAuth(false); 
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
            {children}
        </html>
    );
}
