import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div
          className="w-16 h-16 border-8 border-t-8 border-gray-300 border-t-blue-600 border-solid rounded-full animate-spin"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-4 text-gray-600 text-lg">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
