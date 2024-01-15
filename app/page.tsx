"use client"
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-transparent">
      <div className="flex overflow-hidden">
        <button className="text-gray-500 hover:text-gray-600" id="open-sidebar" onClick={toggleSidebar}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div
          className={`absolute bg-gray-800 text-white w-56 min-h-screen overflow-y-auto transition-transform transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ease-in-out duration-300`}
          id="sidebar"
          onMouseLeave={toggleSidebar}
        >
          <div className="p-4">
            <h1 className="text-2xl font-semibold">Sidebar</h1>
            <ul className="mt-4">
              <li className="mb-2">
                <a href="#" className="block hover:text-indigo-400">
                  Home
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
