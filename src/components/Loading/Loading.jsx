// Loading.js
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-main-green animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
        </div>
        <p className="text-xl font-semibold text-white">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
