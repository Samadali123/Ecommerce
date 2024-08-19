import React, { useContext ,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import UserContext from '../contexts/usercontext';


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
      <header className="bg-white-600 shadow-md sticky top-0 z-50">
      <div className="container  px-2 py-2 md:py-4 flex flex-col md:flex-row items-center gap-4 whitespace-nowrap justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 md:space-x-4">
          
          <div className="text-black text-xs md:text-xl ">
            Apna<span className="text-black">@Mart</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center w-full md:w-auto md:space-x-4 mt-2 md:mt-0">
          <input
            className="px-4 py-2 rounded-md w-full md:w-96 text-gray-800 placeholder-gray-500"
            type="text"
            placeholder="Search for products..."
          />
          <button className="bg-black-400 text-gray-800 px-4 py-2 rounded-md mt-2 md:mt-0 hover:bg-blue-500 transition-colors duration-300">
            Search
          </button>
        </div>

        {/* Menu Button for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none ml-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`absolute md:relative top-16 md:top-0 left-0 right-0 bg-white md:bg-transparent md:flex md:space-x-6 p-4 md:p-0 ${isMenuOpen ? "block" : "hidden"}`}
        >
          <Link
            to="/shop"
            className="block text-white md:text-gray-200 hover:text-yellow-400 transition-colors duration-300 md:ml-4"
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="block text-white md:text-gray-200 hover:text-yellow-400 transition-colors duration-300 md:ml-4"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block text-white md:text-gray-200 hover:text-yellow-400 transition-colors duration-300 md:ml-4"
          >
            Contact Us
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          {isAuthenticated ? (
            <>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors duration-300 shadow-lg"
              >
                Logout
              </button>
              <Link
                to="/resetpassword"
                className="bg-yellow-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition-colors duration-300 shadow-lg"
              >
                Reset Password
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-300 shadow-lg"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition-colors duration-300 shadow-lg"
              >
                Sign Up
              </Link>
            </>
          )}
          <div className="flex space-x-4">
            <i className="fas fa-search text-white text-xl hover:text-yellow-400 transition-colors duration-300 cursor-pointer"></i>
            <i className="fas fa-user text-white text-xl hover:text-yellow-400 transition-colors duration-300 cursor-pointer"></i>
            <i className="fas fa-shopping-cart text-white text-xl hover:text-yellow-400 transition-colors duration-300 cursor-pointer"></i>
          </div>
        </div>
      </div>
    </header>
  



      {/* Hero Banner */}
<section className="relative">
  <img
    src="https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Hero Banner"
    className="w-full h-[80vh] object-fit-cover"
  />
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-b from-black/70 via-transparent to-black/70 p-4 md:p-8">
    <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg leading-tight">Welcome to Our Premium Store</h1>
    <p className="text-lg md:text-2xl mt-4 md:mt-6 font-medium drop-shadow-md max-w-xl">Discover top-quality products at unbeatable prices</p>
    <Link
      to="/productsforuser"
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




// import React from 'react'
// import { FaRegUserCircle } from "react-icons/fa";

// const home = () => {
//   return (
//     <header className="bg-white">
//     <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
//       <div className="flex h-16 items-center justify-between">
//         <div className="md:flex md:items-center md:gap-12">
//           <a className="block text-teal-600" href="#">
//             <span className="sr-only">Home</span>
//             <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
//                 fill="currentColor"
//               />
//             </svg>
//           </a>
//         </div>
  
//         <div className="hidden md:block">
//           <nav aria-label="Global">
//              <input className='md:w-[45vw] lg:w-[60vw] text-black border-none' type="text" placeholder='Search products..' />
//           </nav>
//         </div>
  
//         <div className="flex items-center gap-4">
//           <div className="sm:flex sm:gap-4">
//             <a
//               className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
//               href="#"
//             >
//               Login
//             </a>
  
//             <div className="hidden sm:flex">
//               <a
//                 className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
//                 href="#"
//               >
//                 Register
//               </a>
//             </div>
//           </div>
  
//           <div className="block md:hidden">
//             <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="size-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </header>

//   )
// }

// export default home