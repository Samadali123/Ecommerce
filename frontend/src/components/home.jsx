import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import UserContext from '../contexts/usercontext';
import Header from './Header';
import HeroSection from './HeroSection';
import ShopByCategory from './shopByCategory';
import Homeproduct from './homeProducts';
import Footer from './Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CategoryLinks from './CategoryLinks';
import OfferSlider from './OfferSlider';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // References for each section
  const headerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const shopByCategoryRef = useRef(null);
  const homeProductRef = useRef(null);
  const categoryLinksRef = useRef(null);
  const footerRef = useRef(null);

  // Function to handle logout
  const logout = async () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      try {
        await axios.get(`/users/user/logout?token=${token}`);
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
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

  // GSAP animations setup
  // useEffect(() => {
  //   const components = [
  //     { ref: headerRef.current, delay: 0.1 },
  //     { ref: categoryLinksRef.current, delay: 0.2 },
  //     { ref: heroSectionRef.current, delay: 0.3 },
  //     { ref: shopByCategoryRef.current, delay: 0.5 },
  //     { ref: homeProductRef.current, delay: 0.7 },
  //     { ref: footerRef.current, delay: 0.9 },
  //   ];

  //   components.forEach(({ ref, delay }) => {
  //     gsap.fromTo(
  //       ref,
  //       { opacity: 0, y: 50 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 1,
  //         delay,
  //         ease: 'power3.out',
  //         scrollTrigger: {
  //           trigger: ref,
  //           start: 'top 85%',
  //           toggleActions: 'play none none reverse',
  //         },
  //       }
  //     );
  //   });
  // }, []);

  return (
    <div className="home  text-gray-800 overflow-x-hidden overflow-y-auto">
      {/* Header */}
      <div ref={headerRef}>
        <Header />
      </div>

      {/* Category Links */}
      <div ref={categoryLinksRef}>
        <CategoryLinks />
      </div>

      {/* Hero Banner */}
      <div ref={heroSectionRef}>
        <OfferSlider />
      </div>

      

      {/* Featured Products */}
      <div ref={homeProductRef}>
        <Homeproduct />
      </div>

      {/* Footer */}
      <div ref={footerRef}>
        <Footer />
        
      </div>
    </div>
  );
};

export default Home;
