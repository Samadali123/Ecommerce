import React from 'react';
import {useNavigate}  from 'react-router-dom'


const isloggedin = () => {
    const navigate = useNavigate();
    
  const handleSignIn = ()=>{
     navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign In to Continue</h1>
        <p className="text-gray-600 mb-6">
          Please sign in to access this content. You need to be logged in to proceed.
        </p>
        <button
          onClick={handleSignIn}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default isloggedin;
