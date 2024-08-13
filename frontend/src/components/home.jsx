import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import UserContext from '../contexts/usercontext';


const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    // Extract the token from the cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      try {
        // Perform the logout request with the token in the body
        await axios.get(`/logout?token=${token}`);
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
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo */}
            <div className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0">
              Apna@Mart
            </div>

            {/* Navigation */}
            <nav className="flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0">
              <input
                className='px-6 py-3 bg-gray-200 text-gray-700 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 w-full md:w-auto'
                type="text"
                placeholder="Search here..."
              />
              <Link to="/shop" className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300">Shop</Link>
              <Link to="/about" className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300">About Us</Link>
              <Link to="/contact" className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300">Contact Us</Link>
            </nav>

            {/* User Actions */}
            <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-6">
              <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition duration-300 shadow-md">Sign In</Link>
              <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition duration-300 shadow-md">Sign Up</Link>
              <button onClick={logout} className='px-5 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition duration-300 shadow-md'>Logout</button>
              <div className="flex space-x-4 mt-2 md:mt-0">
                <i className="fas fa-search cursor-pointer text-xl text-gray-600 hover:text-gray-900 transition-colors duration-300"></i>
                <i className="fas fa-user cursor-pointer text-xl text-gray-600 hover:text-gray-900 transition-colors duration-300"></i>
                <i className="fas fa-shopping-cart cursor-pointer text-xl text-gray-600 hover:text-gray-900 transition-colors duration-300"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
<section className="relative">
  <img
    src="https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Hero Banner"
    className="w-full h-[80vh] object-cover"
  />
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-b from-black/70 via-transparent to-black/70 p-4 md:p-8">
    <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg leading-tight">Welcome to Our Premium Store</h1>
    <p className="text-lg md:text-2xl mt-4 md:mt-6 font-medium drop-shadow-md max-w-xl">Discover top-quality products at unbeatable prices</p>
    <Link
      to="/shop"
      className="mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-800 text-white rounded-full font-semibold text-base md:text-lg shadow-lg transition-all duration-300"
    >
      Shop Now
    </Link>
  </div>
</section>


      {/* Shop by Category */}
<section className="border-blue-950 py-16 bg-gray-50 text-center">
  <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 text-gray-800">Shop by Category</h2>
  <div className="overflow-x-auto scroll">
    <div className="flex space-x-6 px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Category 1 */}
      <div className="category-item group transition-transform transform hover:scale-105 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Clothing"
          className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
        />
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl font-medium text-gray-700">Clothing</p>
      </div>

      {/* Category 2 */}
      <div className="category-item group transition-transform transform hover:scale-105 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Shoes"
          className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
        />
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl font-medium text-gray-700">Shoes</p>
      </div>

      {/* Category 3 */}
      <div className="category-item group transition-transform transform hover:scale-105 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1507955987999-df4864ee80d4?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mobiles"
          className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
        />
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl font-medium text-gray-700">Mobiles</p>
      </div>

      {/* Category 4 */}
      <div className="category-item group transition-transform transform hover:scale-105 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Electronics"
          className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
        />
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl font-medium text-gray-700">Electronics</p>
      </div>

      {/* Category 5 */}
      <div className="category-item group transition-transform transform hover:scale-105 flex-shrink-0">
        <img
          src="https://plus.unsplash.com/premium_photo-1708958117373-5d354f07a61a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFjY2Vzc29yeXxlbnwwfDB8MHx8fDA%3D"
          alt="Accessories"
          className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
        />
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl font-medium text-gray-700">Accessories</p>
      </div>

      {/* Category 6 */}
      <div className="category-item group transition-transform transform hover:scale-105 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9tZSUyMGRlY29yfGVufDB8MHwwfHx8MA%3D%3D"
          alt="Home Decor"
          className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
        />
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl font-medium text-gray-700">Home Decor</p>
      </div>

      {/* Category 7 */}
      <div className="category-item group transition-transform transform hover:scale-105 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Computers"
          className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
        />
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl font-medium text-gray-700">Computers</p>
      </div>

      {/* Category 8 */}
      <div className="category-item group transition-transform transform hover:scale-105 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1535415493710-bdf0b2dc725e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Beauty Products"
          className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
        />
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl font-medium text-gray-700">Beauty Products</p>
      </div>
    </div>
  </div>
</section>


      {/* Featured Products */}
<section className="py-16 text-center bg-gray-100">
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Featured Products</h2>
  <div className="relative">
    <div className="flex space-x-4 px-4 sm:px-6 md:px-8 py-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <div className="flex-none w-64 sm:w-72 md:w-80 bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <img
          src="https://plus.unsplash.com/premium_photo-1691367279293-f82232361dae?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product 1"
          className="w-full h-32 sm:h-36 md:h-40 object-cover mb-4 rounded-lg"
        />
        <p className="text-base sm:text-lg md:text-lg font-semibold">Polo T-Shirts</p>
        <p className="text-gray-700">$10.00</p>
      </div>
      <div className="flex-none w-64 sm:w-72 md:w-80 bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1699901232384-f1646fb2a8da?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product 2"
          className="w-full h-32 sm:h-36 md:h-40 object-cover mb-4 rounded-lg"
        />
        <p className="text-base sm:text-lg md:text-lg font-semibold">Nike Shoes</p>
        <p className="text-gray-700">$20.00</p>
      </div>
      <div className="flex-none w-64 sm:w-72 md:w-80 bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1722503585127-f850a5cc7da5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product 3"
          className="w-full h-32 sm:h-36 md:h-40 object-cover mb-4 rounded-lg"
        />
        <p className="text-base sm:text-lg md:text-lg font-semibold">iPhone 15</p>
        <p className="text-gray-700">$30.00</p>
      </div>
      <div className="flex-none w-64 sm:w-72 md:w-80 bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <img
          src="https://plus.unsplash.com/premium_photo-1664353833832-b03ab1a002b0?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product 4"
          className="w-full h-32 sm:h-36 md:h-40 object-cover mb-4 rounded-lg"
        />
        <p className="text-base sm:text-lg md:text-lg font-semibold">Leather Bag</p>
        <p className="text-gray-700">$40.00</p>
      </div>
    </div>
  </div>
</section>


      {/* Newsletter Signup */}
<section className="py-16 bg-gradient-to-r from-blue-300 to-blue-500 text-white text-center">
  <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Subscribe to Our Newsletter</h2>
  <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto">Get the latest updates and exclusive offers directly in your inbox.</p>
  <div className="flex flex-col sm:flex-row justify-center items-center">
    <input
      type="email"
      placeholder="Enter your email"
      className="p-4 w-full max-w-md rounded-lg sm:rounded-l-lg border border-blue-300 bg-white text-gray-900 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 sm:mb-0 sm:mr-2"
      required
    />
    <button
      className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg sm:rounded-r-lg font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 w-full sm:w-auto"
    >
      Subscribe
    </button>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            {/* Brand Section */}
            <div className="text-3xl font-extrabold mb-6 md:mb-0">
              Apna@Mart
            </div>

            {/* Links Section */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a>
            </div>

            {/* Copyright Section */}
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Apna@Mart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;