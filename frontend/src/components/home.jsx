import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import UserContext from '../contexts/usercontext';
import Header from './Header';
import HeroSection from './HeroSection';
import ShopByCategory from './shopByCategory';
import Homeproduct from './homeProducts';
import Footer from './Footer';


const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = async () => {
    // Extract the token from the cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      try {
        // Perform the logout request with the token in the body
        await axios.get(`/users/user/logout?token=${token}`);
        // Clear the token cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';

        // Update the authentication state and navigate to the login page
        setIsAuthenticated(false);
        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
        toast.error('Error during logout. Please try again.');
      }
    } else {
      toast.info('Please sign in to sign out.');
    }
  };

  return (
    <div className="home bg-gray-100 text-gray-800 overflow-x-hidden overflow-y-auto">
      {/* Header */}
      <Header />


      {/* Hero Banner */}
    
      <HeroSection />




      {/* Shop by Category */}
      <ShopByCategory />



      {/* Featured Products */}
      <Homeproduct />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;
