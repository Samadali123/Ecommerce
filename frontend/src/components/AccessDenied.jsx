import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AccessDenied = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // Redirect to home page or another relevant page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <FaLock className="text-6xl text-red-500 mb-4 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          Sorry, you don't have access to this page. This section is available for admins only.
        </p>
        <button
          onClick={handleGoBack}
          className="w-full p-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
