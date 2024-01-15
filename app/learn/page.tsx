"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from '@/app/component/Loader';
import Navbar from '@/app/component/Navbar';
import Footer from '@/app/component/Footer';

const RoadMap: React.FC = () => {
  const [moduleData, setModuleData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchModuleData = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/v1/modules");
      const data = await response.json();
      setModuleData(data || []);
    } catch (error) {
      console.error('Error fetching module data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModuleData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className='flex mx-auto max-w-7xl'>
        {moduleData.map((module) => (
          <div key={module._id} className="w-96 h-auto mx-2 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <img className="object-cover w-full h-64" src={module.image} alt="Article" />

            <div className="p-6">
              <div>
                <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                  Total No Task {module.totalTasks}
                </span>
                <Link
                  href={"learn/" + module._id}
                  className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                  tabIndex={0}
                  role="link"
                >
                  {module.title}
                </Link>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{module.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default RoadMap;
