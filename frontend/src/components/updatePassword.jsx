import React, { useState } from 'react';
import axios from '../utils/axios'; // Adjust the import path as needed
import { useParams } from 'react-router-dom';
import Header from './Header';
import Header2 from './header2';

const UpdatePassword = () => {
  const { token } = useParams(); // Extract the token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.put(
        `/users/user/updatepassword`,
        { password, confirmPassword,token},
        
      );

      console.log(response.data);
      alert('Your password has been updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
    <Header2/>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your new password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm your new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors duration-300"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default UpdatePassword;
