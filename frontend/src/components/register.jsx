import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import UserContext from '../contexts/usercontext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; 
import Cookies from 'js-cookie';
import Header from './Header';
import Header2 from './header2';

const Register = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      const response = await axios.post('/users/user/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        isAdmin: formData.isAdmin,
      });

      console.log('Registration successful:', response.data);

      Cookies.set('token', response.data.token, { expires: 1 / 24 });

      toast.success("Registered Successfully.");
      setIsAuthenticated(true);

      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err.message);
      setError('Registration failed. Please try again.');
      if(err.response ? err.response.data : err.message === "User already registered"){
        toast.error("User Already registered")
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const data = jwtDecode(credentialResponse.credential);
      const response = await axios.post('/users/user/google/login', {
        username: data.name,
        email: data.email,
        isAdmin: false,
      });

      console.log('Google login successful:', response.data);

      Cookies.set('token', response.data.token, { expires: 1 / 24 });
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Error during Google login:', error);
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <>
    <Header2/>
    <div className="flex items-center justify-center  h-full bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-left">Register Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@domain.com"
              disabled={loading}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="••••••••"
              disabled={loading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 mt-8 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
              disabled={loading}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="••••••••"
              disabled={loading}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 mt-8 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
              disabled={loading}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-blue-700 text-white rounded-lg mt-4 flex items-center justify-center transition-colors duration-300 ease-in-out hover:bg-blue-900"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              'Register'
            )}
          </button>
        </form>
        <div className="flex items-center justify-between mt-4">
          <hr className="w-full border-gray-300" />
          <span className="text-gray-500 px-4">or</span>
          <hr className="w-full border-gray-300" />
        </div>
        <GoogleLogin
          className="w-full mt-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
            setError('Google login failed. Please try again.');
          }}
        />
      </div>
    </div>
    </>
  );
};

export default Register;

