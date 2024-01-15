"use client"
import Footer from '@/app/component/Footer';
import Loader from '@/app/component/Loader';
import Navbar from '@/app/component/Navbar';
import Progress from '@/app/component/Progress';
import React, { useEffect, useState } from 'react';

const Learn: React.FC = ({ params }) => {
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
          data: moduleData.data.map((task, index) => ({
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

  const handleAnswerCheck = (taskId: string, correctAnswer: string, task: string) => {
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
      const sidebar = document.getElementById('sidebar');
      const openSidebarButton = document.getElementById('open-sidebar');

      if (
        sidebar &&
        openSidebarButton &&
        !sidebar.contains(event.target as Node) &&
        !openSidebarButton.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', closeSidebarOnClickOutside);

    return () => {
      document.removeEventListener('mousedown', closeSidebarOnClickOutside);
    };
  }, []);

  if (!moduleDetails) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div>
        <section className="bg-white dark:bg-gray-900 ">
          <div className="container px-6 py-12 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">
              {renderHTML(moduleDetails.title)}
            </h1>
            <p className="mt-5 text-lg font-semibold text-center text-gray-800 lg:text-xl dark:text-white">
              {renderHTML(moduleDetails.description)}
            </p>
            <img src={moduleDetails.image} className='mx-auto mt-5'></img>



            <div className="lg:hidden sticky top-0 transform -translate-y-1/10">
            <div className="flex overflow-hidden ml-[-25px]">
              <button className="text-gray-500 hover:text-gray-600" id="open-sidebar" onClick={toggleSidebar}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              <div
                className={`fixed bg-gray-800 text-white w-56 overflow-y-auto transition-transform transform ${
                  isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } ease-in-out duration-300`}
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


            <div className="mt-8 xl:mt-16 lg:flex lg:-ml-1 ">
              <div className="hidden lg:block lg:w-1/4 lg:ml-10 md:ml-4">
                <div className="sticky top-20">
                  <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Table of Content</h1>
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

              <div className="flex-1 mt-8 lg:mx- lg:mt-0 ">
                {moduleDetails.data &&
                  moduleDetails.data.map((task: any) => (
                    <div key={task._id} id={task._id}>
                      <button
                        className="flex items-center focus:outline-none"
                        onClick={() => toggleDropdown(task._id)}
                      >
                        <svg
                          className={`flex-shrink-0 w-6 h-6 text-blue-500 ${expandedTasks[task._id] ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                        </svg>
                        <h1 className="mx-4 text-xl text-gray-700 dark:text-white">{renderHTML(task.taskTitle)}</h1>
                      </button>
                      {expandedTasks[task._id] && (
                        <div>
                          <div className="flex mt-8 md:mx-10">
                            <span className="border border-blue-500"></span>
                            <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">{renderHTML(task.taskDesc)}</p>
                          </div>
                          <div className="flex mt-8 md:mx-10">
                            <h2 className="text-gray-500 dark:text-gray-300">Questions :</h2>
                            {task.tasksInfo && (
                              <div>
                                {task.tasksInfo.map((question: any) => (
                                  <div key={question._id} className="mt-4">
                                    <p className='text-gray-500 dark:text-gray-300'>{renderHTML(question.question)}</p>
                                    <input
                                      className='text-black border-[1px]'
                                      type="text"
                                      value={submissions[task._id] || ''}
                                      onChange={(e) => {
                                        setSubmissions((prevState) => ({ ...prevState, [task._id]: e.target.value }));
                                      }}
                                    />


                                    <button className='text-gray-500 dark:text-gray-300' onClick={() => handleAnswerCheck(task._id, question.correctAnswer)}>
                                      Check Answer
                                    </button>
                                    <button className='text-gray-500 dark:text-gray-300 p-3 border-1 border-gray-500' onClick={() => handleHintClick(task._id)}>Hint</button>
                                    {hintVisibility[task._id] && <p>{renderHTML(question.hint)}</p>}
                                    {question.correct && <span>Correct!</span>}
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

export default Learn;
