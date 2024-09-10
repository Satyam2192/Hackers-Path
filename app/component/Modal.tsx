import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  button1Action: () => void; 
  button1description: string;
  button2Action: () => void; 
  button2description: string;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, button1Action, button1description, button2Action, button2description }) => {
  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow bg-gray-800">
          {/* Close button */}
          <button
            type="button"
            className="absolute top-3 right-2.5 text-white bg-transparen rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600"
            onClick={onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-white w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            {/* Title */}
            <h3 className="mb-5 text-lg font-normal text-white">
              {title}
            </h3>

            {/* Description */}
            <p className="mb-5 text-sm text-white">
              {description}
            </p>
            <div className=" ">
              <button
                onClick={button1Action}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                {button1description}
              </button>

              <button
                onClick={button2Action}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                {button2description}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
