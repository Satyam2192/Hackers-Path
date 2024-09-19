"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SuccessMessage from "../component/SuccessMessage";
import ErrorMessage from "../component/ErrorMessage";

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: 'guest@gmail.com',
        password: '1234',
    });
    const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
    const [isErrorMessageVisible, setErrorMessageVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get and decode redirect URL
    const redirecturl = decodeURIComponent(searchParams.get('redirecturl') || '/');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (formData.email.trim() === '') {
            setErrorMessage('Email cannot be empty.');
            setErrorMessageVisible(true);
            return false;
        }
        if (formData.password.trim() === '') {
            setErrorMessage('Password cannot be empty.');
            setErrorMessageVisible(true);
            return false;
        }

        return true;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;
    
        try {
            const response = await fetch('https://sk-hackers-path.onrender.com/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('token', data.token); 
    
                setSuccessMessageVisible(true);
    
                setTimeout(() => {
                    window.location.href = redirecturl || "/"; 
                }, 900);
            } else {
                // Login failed
                setErrorMessage(data.message || 'Login failed.');
                setErrorMessageVisible(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred during login.');
            setErrorMessageVisible(true);
        }
    };
    

    
    return (
        <body className="font-mono bg-black text-green-300">
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div
                            className="w-full lg:w-6/12 h-full lg:block hidden bg-black bg-cover bg-center rounded-l-lg"
                            style={{ backgroundImage: `url(https://i.ibb.co/9GrGcQf/login.jpg)` }}
                        ></div>

                        <div className="w-full lg:w-7/12 bg-black p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-black rounded">
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-green-300" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm leading-tight text-green-300 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={formData.email}    
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-green-300" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-green-300 border-green-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                        name="password"
                                        value={formData.password}  
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-black bg-green-300 rounded-full hover:bg-green-500 focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={handleLogin}
                                    >
                                        Log In
                                    </button>
                                </div>
                                <hr className="mb-6 border-t border-green-300" />
                                <div className="text-center">
                                    <Link
                                        className="inline-block text-sm text-green-300 align-baseline hover:text-green-500"
                                        href="/register"
                                    >
                                        Create an Account!
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {isSuccessMessageVisible && (
                <SuccessMessage message="Your Login was Successful. You will be redirected!" />
            )}

            {isErrorMessageVisible && (
                <ErrorMessage
                    message={errorMessage}
                    onClose={() => setErrorMessageVisible(false)}
                />
            )}
        </body>
    );
};

export default Login;
