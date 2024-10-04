"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { HeroParallax } from "./ui/hero-parallax";
import Loader from "@/app/component/Loader";
import Navbar from "@/app/component/Navbar/Navbar";
import Footer from "@/app/component/Footer";


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


  useEffect(() => {
    fetchModuleData();
  }, [fetchModuleData]);

  const modulesToProducts = useMemo(() => moduleData.map((module) => ({
    title: module.title,
    link: `/learn/${module._id}`,
    thumbnail: module.image,
  })), [moduleData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <HeroParallax products={modulesToProducts} />
      <Footer />
    </>
  );
}

export default React.memo(HeroParallaxDemo);