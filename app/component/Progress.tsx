import React, { useEffect, useRef } from 'react';

const Progress: React.FC<{ completionPercent: number }> = ({ completionPercent }) => {
    const circumference = 2 * Math.PI * 30;
  
    return (
      <div
        data-percent={0}
        data-circumference={circumference}
        className=" inline-flex items-center justify-center overflow-hidden rounded-full bottom-5 left-5"
      >
        <svg className="w-20 h-20">
          <circle
            className="text-gray-300"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="40"
            cy="40"
          />
          <circle
            className="text-blue-600"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (completionPercent / 100) * circumference}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="40"
            cy="40"
          />
        </svg>
        <span className="absolute text-xl text-blue-700">{`${completionPercent}%`}</span>
      </div>
    );
  };

export default Progress;
