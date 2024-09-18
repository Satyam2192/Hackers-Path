"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SuccessMessage from '../component/SuccessMessage';
import ErrorMessage from '../component/ErrorMessage';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  c_password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    c_password: '',
  });
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.c_password) {
      setErrorMessage('All fields are required');
      return false;
    }
    if (formData.password !== formData.c_password) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      setErrorMessageVisible(true);
      return;
    }

    try {
      const response = await fetch('https://sk-hackers-path.onrender.com/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          username: formData.email,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessageVisible(true);
        setTimeout(() => {
          router.push('/login');
        }, 900);
      } else {
        setErrorMessage(data.message || 'Registration failed');
        setErrorMessageVisible(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred during registration');
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
              style={{ backgroundImage: "url('https://i.ibb.co/KL5jsHV/register.jpg')" }}
            ></div>

            <div className="w-full lg:w-7/12 bg-black p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center text-green-300">Create an Account!</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-black rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-green-300" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-green-300 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-green-300" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-green-300 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-green-300" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-green-300 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-green-300" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-green-300 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-green-300" htmlFor="c_password">
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-green-300 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      placeholder="******************"
                      value={formData.c_password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-black bg-green-300 rounded-full hover:bg-green-500 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleRegister}
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t border-green-300" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-green-300 align-baseline hover:text-green-500"
                    href="/login"
                  >
                    Already have an account? Login!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {isSuccessMessageVisible && (
        <SuccessMessage message="Registration successful! Redirecting to login..." />
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

export default Register;