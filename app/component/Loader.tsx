import React from 'react';
import Navbar from "@/app/component/Navbar/Navbar";
import Footer from "@/app/component/Footer";

const Loader: React.FC = () => {
  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center h-screen bg-black">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
      >
        <path
          d="M7 8H3V16H7V8Z"
          className="fill-green-500 animate-bounce"
        />
        <path
          d="M14 8H10V16H14V8Z"
          className="fill-green-500 animate-bounce"
          style={{ animationDelay: '.2s' }}
        />
        <path
          d="M21 8H17V16H21V8Z"
          className="fill-green-500 animate-bounce"
          style={{ animationDelay: '.4s' }}
        />
      </svg>
    </div>
    <Navbar />
    </>
  );
};

export default Loader;
