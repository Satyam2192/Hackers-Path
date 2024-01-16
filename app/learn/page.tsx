"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/app/component/Loader";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/Footer";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Image from "next/image";

interface Module {
  _id: string;
  image: string;
  totalTasks: number;
  title: string;
  description: string;
}

const Read: React.FC = () => {
  const [moduleData, setModuleData] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  // Fetch module data
  const fetchModuleData = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/v1/modules");
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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      {showConfetti && <Confetti width={width} height={height} />}

      {/* <div className="flex mx-auto max-w-7xl">
        {moduleData.map((module) => (
          <div
            key={module._id}
            className="w-full md:w-96 h-auto mx-2 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <img
              className="object-cover w-full h-64"
              src={module.image}
              alt="Article"
            />

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
                  onClick={showConfettiHandler}
                >
                  {module.title}
                </Link>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {module.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {moduleData.map((module) => (
        <div key={module._id} className="">
          <CardContainer className="inter-var">

            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {module.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {module.description}
                <p className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                  Total No Task {module.totalTasks}
                </p>
              </CardItem>

              <CardItem translateZ="100" className="w-full mt-4"><Link
                href={"learn/" + module._id}
                className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                tabIndex={0}
                role="link"
                onClick={showConfettiHandler}
              >
                <Image
                  src={module.image} height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                /></Link>
              </CardItem>

            </CardBody>

          </CardContainer>

        </div>
      ))}


      <Footer />
    </>
  );
};

export default Read;