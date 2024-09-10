"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Loader from "@/app/component/Loader";
import Navbar from "@/app/component/Navbar/Navbar";
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastModuleElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isFetching) {
        fetchMoreModules();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, isFetching]);

  // Fetch module data
  const fetchModuleData = async (pageNum: number) => {
    setIsFetching(true);
    try {
      const response = await fetch(`https://sk-hackers-path.onrender.com/api/v1/modules?page=${pageNum}&limit=5`);
      const data = await response.json();

      if (Array.isArray(data.modules)) {
        if (data.modules.length === 0) {
          setHasMore(false);
        } else {
          setModuleData(prev => [...prev, ...data.modules]);
          setPage(pageNum);
        }
      } else {
        console.error("Unexpected data structure:", data);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching module data:", error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };


  const fetchMoreModules = () => {
    if (!isFetching && hasMore) {
      fetchModuleData(page + 1);
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
    fetchModuleData(1);
  }, []);

  if (loading && moduleData.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      {showConfetti && <Confetti width={width} height={height} />}

      <div className="container mx-auto max-w-[92%]">
        <p className="text-3xl font-semibold text-green-300">Modules</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          {moduleData.map((module, index) => (
            <div
              key={module._id}
              ref={index === moduleData.length - 1 ? lastModuleElementRef : null}

            >
              <Link
                href={`/learn/${module._id}`}
                className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600"
                tabIndex={0}
                role="link"
                onClick={showConfettiHandler}
              >
                <CardContainer className="inter-var ">
                  <CardBody className="bg-gray-50 md:w-[430px] md:h-[400px] relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  rounded-xl p-6 border">
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

                    <CardItem translateZ="100" className="w-full mt-4">

                      <Image
                        src={module.image}
                        height={1000}
                        width={1000}
                        className="h-60 w-100 object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                      />

                    </CardItem>
                  </CardBody>
                </CardContainer> </Link>
            </div>
          ))}
        </div>

        {isFetching && <Loader />}

        {!isFetching && hasMore && (
          <div className="text-center mt-8 mb-8">
            <button
              onClick={fetchMoreModules}
              className="bg-green-300  text-white font-bold py-2 px-4 rounded"
            >
              Show More
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Read;