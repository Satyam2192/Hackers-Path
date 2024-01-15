"use client"
import React, { useState } from 'react';
import Navbar from './component/Navbar';
import Footer from './component/Footer';

const Home: React.FC = () => {


  return (
    <div className="bg-transparent">
      <Navbar />
      <h1>Home</h1>
      <Footer />
      
    </div>
  );
};

export default Home;
