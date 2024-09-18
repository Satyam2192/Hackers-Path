import React from 'react';

interface ErrorMessageProps {
    message: string;
    onClose: () => void;
  }
  
  const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 sm:w-80">
      <div className="relative flex flex-col sm:flex-row sm:items-center border-2 border-red-500 shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
          <div
            className="text-red-500 hover:text-red-800 cursor-pointer"
            onClick={onClose}
          >
            <svg
              className="w-6 sm:w-5 h-6 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <div className="text-sm text-red-500 font-bold ml-3">Error:</div>
        </div>
        <div className="text-sm tracking-wide text-red-500 mt-4 sm:mt-0 sm:ml-4">{message}</div>
      </div>
    </div>
  );
};

export default ErrorMessage;