"use client";
import React, { useState, useEffect } from "react";
import { HeroParallax } from "./ui/hero-parallax";
import Loader from "@/app/component/Loader";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/Footer";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

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

  // Fetch module data
  const fetchModuleData = async () => {
    try {
      const response = await fetch("https://sk-hackers-path.onrender.com/api/v1/modules");
      const data = await response.json();
      setModuleData(data || []);
    } catch (error) {
      console.error("Error fetching module data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show confetti animation
  const showConfettiHandler = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  useEffect(() => {
    fetchModuleData();
  }, []);

  const modulesToProducts = moduleData.map((module) => ({
    title: module.title,
    link: `/learn/${module._id}`,
    thumbnail: module.image,
  }));

  if (loading) {
    return <Loader />;
  }
  return <>
    <Navbar />
    <HeroParallax products={modulesToProducts} />
    <Footer />
  </>;
}



export default HeroParallaxDemo;
