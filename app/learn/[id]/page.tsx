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
              <div className=' lg:hidden flex justify-center mt-10'>
              <Progress completionPercent={completionPercent} /></div>
            </div>
          </div>
        </section>

        {/* main content */}
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
                            whileHover={{ scale: 1.02 }}
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
                          viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.144"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g>
                          
                        </motion.svg>
                        <h1 className="mx-4 text-xl text-white text-left">{renderHTML(task.taskTitle)}</h1>
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

        
      </div>
      <Footer />
    </>
  );
};
