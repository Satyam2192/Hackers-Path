"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
    const [isErrorMessageVisible, setErrorMessageVisible] = useState(false);

    const router = useRouter();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('https://sk-hackers-path.onrender.com/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                localStorage.setItem('token', data.token);
                setSuccessMessageVisible(true);

                setTimeout(() => {
                    router.push('/learn');
                }, 2000);
            } else {
                // Login failed
                setErrorMessageVisible(true);
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
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
                                    <label className="block mb-2 text-sm font-bold text-green-300" htmlFor="username">
                                        Username
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm leading-tight text-green-300 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-green-300" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-green-300 border border-red-500 focus:border-green-500  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <p className="text-xs italic text-red-500">Please choose a password.</p>
                                </div>
                                <div className="mb-4">
                                    <input className="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
                                    <label className="text-sm text-green-300" htmlFor="checkbox_id">
                                        Remember Me
                                    </label>
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
                                {/* <div className="text-center">
                                    <Link
                                        className="inline-block text-sm text-green-300 align-baseline hover:text-green-500"
                                        href="#"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Message */}
            {isSuccessMessageVisible && (
                <div className="fixed bottom-4 right-4 sm:w-80">
                    <div className="relative flex flex-col sm:flex-row sm:items-center border-2 border-green-500 shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
                        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                            <div className="text-green-500">
                                <svg
                                    className="w-6 sm:w-5 h-6 sm:h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div className="text-sm font-medium ml-3">Success Login.</div>
                        </div>
                        <div className="text-sm tracking-wide text-green-500 mt-4 sm:mt-0 sm:ml-4">Your Login was Successful. You can use our services!</div>

                    </div>
                </div>
            )}
            {/* Error Message */}
            {isErrorMessageVisible && (
                <div className="fixed bottom-4 right-4 sm:w-80">
                    <div className="relative flex flex-col sm:flex-row sm:items-center border-2 border-red-500 shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
                        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                            <div
                                className="text-red-500 hover:text-red-800 cursor-pointer"
                                onClick={() => setErrorMessageVisible(false)}
                            >
                                <svg
                                    className="w-6 sm:w-5 h-6 sm:h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </div>
                            <div className="text-sm font-medium ml-3">Error Login.</div>
                        </div>
                        <div className="text-sm tracking-wide text-red-500 mt-4 sm:mt-0 sm:ml-4">Your Login was Unsuccessful. Please try again!</div>

                    </div>
                </div>
            )}
        </body>
    );
};

export default Login;
