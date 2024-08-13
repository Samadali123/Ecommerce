


import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'; // Import js-cookie
import UserContext from '../contexts/usercontext';


const Registeradmin = () => {
 
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: true,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Perform form validation
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Send a POST request to the /register API endpoint
      const response = await axios.post('/register', {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        isAdmin: formData.isAdmin,
      });

      // Handle successful registration
      console.log('Registration successful:', response.data);
      
      // Set the token as a cookie for 1 hour
      Cookies.set('token', response.data.token, { expires: 1 / 24 }); // 1 hour

      toast.success("Registered Successfully.");
      
      setIsAuthenticated(true)
      

      navigate('/login'); // Redirect to the login page upon success
    } catch (err) {
      // Handle errors
      console.error('Registration error:', err.response ? err.response.data : err.message);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Register Admin</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          {/* <div className="mb-4 flex items-center gap-3">
            <label htmlFor="isAdmin" className="block text-gray-700 mb-2">Register as Admin</label>
            <input
              type="checkbox"
              name="isAdmin"
              id="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              className="w-5 h-5"
            />
          </div> */}
          <button
            type="submit"
            className={`w-full p-3 rounded-lg font-semibold ${loading ? 'bg-gray-400' : 'bg-blue-600 text-white'}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Already have an account?{' '}
          <a
            onClick={() => navigate('/login')}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registeradmin;

