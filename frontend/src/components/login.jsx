

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Cookies from 'js-cookie';
import UserContext from '../contexts/usercontext';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; 


const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/users/user/login', {
        email: formData.email,
        password: formData.password,
      });

  
      console.log('Login successful:', response.data);

      Cookies.set('token', response.data.token, { expires: 1 / 24 });

      setIsAuthenticated(true);
      navigate('/'); 
    } catch (err) {
    
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Email or password is incorrect. Please try again.');

      setTimeout(() => {
        setError(null);
      }, 1000);
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
        isAdmin : false
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
            setError('Google login failed. Please try again.');
          }}
        />

        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 rounded-lg font-semibold ${loading ? 'bg-gray-400' : 'bg-blue-600 text-white'}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className="text-blue-600 cursor-pointer">
            Register
          </span>
        </p>
        <p className="mt-4 text-gray-600 text-center">
          Want to login as Admin ?{' '}
          <span onClick={() => navigate('/loginadmin')} className="text-blue-600 cursor-pointer">
            Admin Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
