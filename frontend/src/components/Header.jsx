
import React, { useState,useContext } from 'react';
import { FiShoppingCart, FiX } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import UserContext from '../contexts/usercontext';


const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
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

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setSuggestions(value ? ['Suggestion 1', 'Suggestion 2', 'Suggestion 3', 'Suggestion 4', 'Suggestion 5', 'Suggestion 6'] : []);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSuggestions([]);
    };

    const handleMouseEnter = () => {
        setIsDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    };

    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center" style={{ padding: '2rem', height: '8vh' }}>
            <div className="flex items-center">
                <img
                    src="https://www.kinexmedia.com/wp-content/uploads/2014/01/ecommerce-3.jpg"
                    alt="Logo"
                    style={{ height: '6vh', width: 'auto' }}
                />
            </div>
            <div className="relative mx-4" style={{ width: '50vw', maxWidth: '30rem' }}>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{
                            padding: '0.75rem 1.5rem',
                            height: '2.75rem',
                            fontSize: '1rem',
                        }}
                    />
                    {searchTerm && (
                        <button 
                            className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-500 hover:text-gray-700"
                            onClick={clearSearch}
                        >
                            <FiX size={18} />
                        </button>
                    )}
                </div>

                {searchTerm && (
                    <div className="absolute w-full bg-white border border-gray-300 mt-1 shadow-lg rounded-lg z-10 transition-all duration-300 ease-in-out transform origin-top-left scale-95">
                        {suggestions.map((suggestion, index) => (
                            <div key={index} className="p-3 hover:bg-blue-100 cursor-pointer transition-all duration-200">
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center space-x-6">
                <a href="/cart" className="text-blue-700 hover:text-blue-900" style={{ fontSize: '1.2rem' }}><FiShoppingCart /></a>
                <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                >
                    <a href="#" className="text-blue-700 hover:text-blue-900" style={{ fontSize: '1.2rem' }}><FaRegUser /></a>
                    {isDropdownVisible && (
                        <div className="absolute right-0 z-10 mt-6 ml-2 w-48 bg-white border border-gray-500 shadow-lg rounded-lg"
                            onMouseLeave={handleMouseLeave}
                        >
                             {isAuthenticated ? ( <>
                                <a href="/resetpassword" className="block px-4 py-2 hover:bg-blue-100" style={{ fontSize: '1rem' }}>Reset Password</a>
                                <a href="/" onClick={logout} className="block px-4 py-2 hover:bg-blue-100" style={{ fontSize: '1rem' }}>Logout</a>
                             </> ) : (
                            <><a href="/login" className="block px-4 py-2 hover:bg-blue-100" style={{ fontSize: '1rem' }}>Sign In</a><a href="/register" className="block px-4 py-2 hover:bg-blue-100" style={{ fontSize: '1rem' }}>Sign Up</a><a href="/loginadmin" className="block px-4 py-2 hover:bg-blue-100" style={{ fontSize: '1rem' }}>As Admin</a></>
                        )} </div> 
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
