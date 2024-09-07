"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from 'next/dynamic';
import { HeroParallax } from "./ui/hero-parallax";
import Loader from "@/app/component/Loader";
import Navbar from "@/app/component/Navbar/Navbar";
import Footer from "@/app/component/Footer";
import { useWindowSize } from "react-use";

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

interface Module {
  _id: string;
  image: string;
  totalTasks: number;
  title: string;
  description: string;
}

function HeroParallaxDemo() {
  const [moduleData, setModuleData] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const fetchModuleData = useCallback(async () => {
    try {
      const response = await fetch("https://sk-hackers-path.onrender.com/api/v1/modules");
      const data = await response.json();
      setModuleData(data.modules || []); 
    } catch (error) {
      console.error("Error fetching module data:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  

  // Memoize the showConfettiHandler to prevent unnecessary re-creations
  const showConfettiHandler = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }, []);

  useEffect(() => {
    fetchModuleData();
  }, [fetchModuleData]);

  // Memoize the modulesToProducts transformation
  const modulesToProducts = useMemo(() => moduleData.map((module) => ({
    title: module.title,
    link: `/learn/${module._id}`,
    thumbnail: module.image,
  })), [moduleData]);

  const handleButtonClick = () => {
    showConfettiHandler();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <HeroParallax products={modulesToProducts} />
      <button onClick={handleButtonClick}>Celebrate!</button>
      <Footer />
      {showConfetti && <Confetti width={width} height={height} />}
    </>
  );
}

export default React.memo(HeroParallaxDemo);