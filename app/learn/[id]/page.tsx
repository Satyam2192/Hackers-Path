"use client"
import Footer from '@/app/component/Footer';
import Loader from '@/app/component/Loader';
import Navbar from '@/app/component/Navbar';
import Progress from '@/app/component/Progress';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Learn({ params }: {
  params: { id: string }
}) {

  const id = params.id;
  const [moduleDetails, setModuleDetails] = useState<any>(null);
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});
  const [submissions, setSubmissions] = useState<Record<string, string>>({});
  const [hintVisibility, setHintVisibility] = useState<Record<string, boolean>>({});
  const [completionPercent, setCompletionPercent] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const response = await fetch(`https://sk-hackers-path.onrender.com/api/v1/modules/${id}`);
        const moduleData = await response.json();

        const mergedData = {
          ...moduleData,
          data: moduleData.data.map((task: any, index: number) => ({
            ...task,
            taskInfo: moduleData.data[index]?.tasksInfo[0] || {},
            submission: submissions[task._id] || '',
          })),
        };

        setModuleDetails(mergedData);
      } catch (error) {
        console.error('Error fetching module details:', error);
      }
    };

    fetchModuleDetails();
  }, [id, submissions]);



  const toggleDropdown = (taskId: string) => {
    setExpandedTasks((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const handleAnswerCheck = (taskId: string, correctAnswer: string) => {
    const trimmedSubmission = (submissions[taskId] || '').trim();
    const trimmedCorrectAnswer = correctAnswer.trim();

    console.log("-->", trimmedSubmission, "---->", trimmedCorrectAnswer);

    if (trimmedSubmission === trimmedCorrectAnswer) {
      alert("Correct answer!");

      setCompletionPercent((prevPercent) => Math.min(prevPercent + 100 / moduleDetails.totalTasks, 100));
    } else {
      alert("Incorrect answer. Try again!");
    }
  };

  const handleHintClick = (taskId: string) => {
    setHintVisibility((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const renderHTML = (html: string) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const closeSidebarOnClickOutside = (event: MouseEvent) => {

      const sidebar = document.getElementById("sidebar");
      const openSidebarButton = document.getElementById("open-sidebar");

      if (
        sidebar &&
        openSidebarButton &&
        !sidebar.contains(event.target as Node) &&
        !openSidebarButton.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", closeSidebarOnClickOutside);

    return () => {
      document.removeEventListener("mousedown", closeSidebarOnClickOutside);
    };
  }, []);


  if (!moduleDetails) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div>
        <section className="bg-black text-white py-12">
          <div className="container px-6 mx-auto">
            <div className="md:flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-center text-white lg:text-3xl">{renderHTML(moduleDetails.title)}</h1>
                <p className="mt-5 text-lg font-semibold text-center text-gray-300 lg:text-xl">{renderHTML(moduleDetails.description)}</p>
              </div>

              <Image width={500} height={300} src={moduleDetails.image} className=' w-[300px]  md:w-auto h-auto mx-auto mt-5 max-w-screen-sm' alt='module details'/>
            </div>
          </div>
        </section>

        {/* Sidebar for mobile */}
        <div className="lg:hidden sticky top-0 transform -translate-y-1/10">
          <div className="flex overflow-hidden ">
            <button
              className="text-gray-500 hover:text-gray-600"
              id="open-sidebar"
              onClick={toggleSidebar}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
            <div
              className={`fixed bg-gray-800 text-white w-56 overflow-y-auto transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ease-in-out duration-300`}
              id="sidebar"
            >
              <div className="p-4">
                <h1 className="text-xl font-semibold">Table of Content</h1>
                <div className="mt-4 space-y-4 lg:mt-8">
                  {moduleDetails.data &&
                    moduleDetails.data.map((task: any) => (
                      <div key={task._id}>
                        <a
                          href={`#${task._id}`}
                          onClick={() => toggleDropdown(task._id)}
                          className="block text-blue-500 dark:text-blue-400 hover:underline"
                        >
                          {renderHTML(task.taskTitle)}
                        </a>
                      </div>
                    ))}
                  <Progress completionPercent={completionPercent} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-gray-900 text-white">
          <div className="container px-6 py-12 mx-auto">
            <div className="lg:flex lg:-ml-1 ">
              <div className="hidden lg:block lg:w-1/4 lg:ml-10 md:ml-4">
                <div className="sticky top-20">
                  <h1 className="text-xl font-semibold">Table of Content</h1>
                  <div className="mt-4 space-y-4 lg:mt-8">
                    {moduleDetails.data &&
                      moduleDetails.data.map((task: any) => (
                        <div key={task._id}>
                          <motion.a
                            href={`#${task._id}`}
                            onClick={() => toggleDropdown(task._id)}
                            whileHover={{ scale: 1.1 }}
                            className="block text-blue-500 hover:underline"
                          >
                            {renderHTML(task.taskTitle)}
                          </motion.a>
                        </div>
                      ))}
                    <Progress completionPercent={completionPercent} />
                  </div>
                </div>
              </div>

              <div className="flex-1 mt-8 lg:mx- lg:mt-0 ">
                {moduleDetails.data &&
                  moduleDetails.data.map((task: any) => (
                    <div key={task._id} id={task._id}>
                      <motion.button
                        className="flex items-center focus:outline-none"
                        onClick={() => toggleDropdown(task._id)}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.svg
                          className={`flex-shrink-0 w-6 h-6 text-blue-500 ${expandedTasks[task._id] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          whileTap={{ scale: 0.9 }}
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                        </motion.svg>
                        <h1 className="mx-4 text-xl text-white">{renderHTML(task.taskTitle)}</h1>
                      </motion.button>
                      {expandedTasks[task._id] && (
                        <div>
                          <div className="flex mt-8 md:mx-10">
                            <span className="border border-blue-500"></span>
                            <p className="max-w-3xl px-4 text-gray-300">{renderHTML(task.taskDesc)}</p>
                          </div>
                          <div className="flex mt-8 md:mx-10">
                            <h2 className="text-gray-300">Questions :</h2>
                            {task.tasksInfo && (
                              <div>
                                {task.tasksInfo.map((question: any) => (
                                  <div key={question._id} className="mt-4">
                                    <p className='text-gray-300'>{renderHTML(question.question)}</p>
                                    <input
                                      className='text-black border-[1px]'
                                      type="text"
                                      value={submissions[task._id] || ''}
                                      onChange={(e) => {
                                        setSubmissions((prevState) => ({ ...prevState, [task._id]: e.target.value }));
                                      }}
                                    />


                                    <motion.button
                                      className='text-gray-300'
                                      onClick={() => handleAnswerCheck(task._id, question.correctAnswer)}
                                      whileHover={{ scale: 1.1 }}
                                    >
                                      Check Answer
                                    </motion.button>
                                    <motion.button
                                      className='text-gray-300 p-3 border-1 border-gray-500'
                                      onClick={() => handleHintClick(task._id)}
                                      whileHover={{ scale: 1.1 }}
                                    >
                                      Hint
                                    </motion.button>
                                    {hintVisibility[task._id] && <p>{renderHTML(question.hint)}</p>}
                                    {question.correct && <span className="text-green-500">Correct!</span>}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      <hr className="my-8 border-gray-200 dark:border-gray-700" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar for mobile */}
        <div className="lg:hidden">
          <motion.div
            className={`fixed bg-gray-800 text-white w-56 overflow-y-auto transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } ease-in-out duration-300`}
            id="sidebar"
            initial={{ x: '-100%' }}
            animate={{ x: isSidebarOpen ? 0 : '-100%' }}
          >
            <div className="p-4">
              <h1 className="text-xl font-semibold">Table of Content</h1>
              <div className="mt-4 space-y-4 lg:mt-8">
                {moduleDetails.data &&
                  moduleDetails.data.map((task: any) => (
                    <motion.div
                      key={task._id}
                      whileHover={{ scale: 1.1 }}
                    >
                      <a
                        href={`#${task._id}`}
                        onClick={() => toggleDropdown(task._id)}
                        className="block text-blue-500 dark:text-blue-400 hover:underline"
                      >
                        {renderHTML(task.taskTitle)}
                      </a>
                    </motion.div>
                  ))}
                <Progress completionPercent={completionPercent} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};
