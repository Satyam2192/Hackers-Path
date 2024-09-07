"use client"
import Footer from '@/app/component/Footer';
import Loader from '@/app/component/Loader';
import Navbar from '@/app/component/Navbar/Navbar';
import Progress from '@/app/component/Progress';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AuthWrapper from '@/app/component/AuthWrapper';

export default function Learn({ params }: { params: { id: string } }) {
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
    <AuthWrapper>
      <Navbar />
      <div>
        <section className="bg-black text-white py-12 max-w-[92%] mx-auto">
          <div className="container">
            <div className="md:flex items-center justify-center gap-24">
              <div className="text-center max-w-[40%]">
                <h1 className="lg:text-4xl font-semibold text-3xl text-upper capitalize">{renderHTML(moduleDetails.title)}</h1>
                <p className="mt-5 text-md font-normal lg:text-xl">{renderHTML(moduleDetails.description)}</p>
              </div>
              <div className="flex justify-center mt-5 md:mt-0 max-w-[50%]">
                <Image
                  width={350}
                  height={300}
                  src={moduleDetails.image}
                  className="w-[300px] md:w-auto h-auto max-w-screen-sm"
                  alt="module details"
                />
              </div>
              <div className="lg:hidden flex justify-center mt-10">
                <Progress completionPercent={completionPercent} />
              </div>
            </div>
          </div>
        </section>


        {/* main content */}
        <section className="bg-gray-900 text-white">
          <div className="container px-6 py-12 mx-auto">
            <div className="lg:flex lg:-ml-1 ">
              <div className="hidden lg:block lg:w-1/4 lg:ml-10 md:ml-4">
                <div className="sticky top-20">
                  <h1 className="text-2xl font-semibold">Table of Content</h1>
                  <div className="mt-4 space-y-4 lg:mt-8">
                    {moduleDetails.data &&
                      moduleDetails.data.map((task: any) => (
                        <div key={task._id}>
                          <a
                            href={`#${task._id}`}
                            onClick={() => toggleDropdown(task._id)}

                            className="block text-blue-500 text-lg hover:underline"
                          >
                            {renderHTML(task.taskTitle)}
                          </a>
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
                      <button
                        className="flex items-center focus:outline-none"
                        onClick={() => toggleDropdown(task._id)}
                      >
                        {/* <svg
                          className={`flex-shrink-0 w-6 h-6 text-white ${expandedTasks[task._id] ? 'rotate-180' : ''}`}
                          viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.144"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g>
                        </svg> */}
                        <svg
                          className={`flex-shrink-0 w-6 h-6 text-white ${expandedTasks[task._id] ? 'rotate-180' : ''}`}
                          width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.1808 15.8297L6.54199 9.20285C5.89247 8.27496 6.55629 7 7.68892 7L16.3111 7C17.4437 7 18.1075 8.27496 17.458 9.20285L12.8192 15.8297C12.4211 16.3984 11.5789 16.3984 11.1808 15.8297Z" fill="#ffffff"></path> </g></svg>
                        <h1 className="mx-4 text-xl text-white text-left">{renderHTML(task.taskTitle)}</h1>
                      </button>
                      {expandedTasks[task._id] && (
                        <div>
                          <div className="flex mt-8 md:mx-10 ">
                            <span className="border border-blue-500"></span>
                            <p className="max-w-4xl px-4 text-white text-lg">{renderHTML(task.taskDesc)}</p>
                          </div>
                          <div className="flex mt-8 md:mx-10">
                            <h2 className="text-white text-2xl font-semibold">Questions:
                              {task.tasksInfo && (
                                <div>
                                  {task.tasksInfo.map((question: any) => (
                                    <div key={question._id} className="mt-4 space-x-4 space-y-4">
                                      <p className="text-white">{renderHTML(question.question)}</p>
                                      <input
                                        className="w-4xl text-black text-lg font-medium p-1 rounded focus:none"
                                        type="text"
                                        value={submissions[task._id] || ''}
                                        onChange={(e) => {
                                          setSubmissions((prevState) => ({ ...prevState, [task._id]: e.target.value }));
                                        }}
                                      />
                                      <button
                                        className="text-white w-40 bg-teal-400 text-lg font-medium p-1 rounded"
                                        onClick={() => handleAnswerCheck(task._id, question.correctAnswer)}
                                      >
                                        Check Answer
                                      </button>
                                      {question.hint && (
                                        <button
                                          className="text-white w-16 bg-teal-400 text-lg font-medium p-1 rounded"
                                          onClick={() => handleHintClick(task._id)}
                                        >
                                          Hint
                                        </button>
                                      )}
                                      {hintVisibility[task._id] && <p className="text-white text-lg font-medium">{renderHTML(question.hint)}</p>}
                                      {question.correct && <span className="text-green-500">Correct!</span>}
                                    </div>
                                  ))}
                                </div>
                              )}</h2>
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
    </AuthWrapper>
  );
}
