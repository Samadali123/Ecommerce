import React, { useState, useContext } from 'react';
import { FiShoppingCart, FiX, FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import UserContext from '../contexts/usercontext';
import axios from '../utils/axios'; // Import axios for making API calls

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
    const navigate = useNavigate(); // Initialize navigate

    const handleSearch = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            try {
                const response = await axios.get(`/products/searchproducts?query=${value}`);
                if (response.data.length === 0) {
                    setSuggestions(['No products found']);
                } else {
                    setSuggestions(response.data.products);
                }
                setError(''); // Clear any previous errors
            } catch (error) {
                console.error('Search error:', error);
                setSuggestions([]);
                setError('Server error, please try again later.');
            }
        } else {
            setSuggestions([]);
        }
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

    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    const logout = async () => {
        if (token) {
            try {
                await axios.get(`/users/user/logout?token=${token}`);
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
                setIsAuthenticated(false);
                navigate('/login');
            } catch (error) {
                console.error('Logout error:', error);
                alert('Error during logout. Please try again.'); // Using alert for simplicity
            }
        } else {
            alert('Please sign in to sign out.');
        }
    };

    return (
        <header className="bg-gradient-to-r from-blue-500 to-purple-500  px-4 py-2 h-[8vh] " >
            <div className='max-w-screen-xl mx-auto flex justify-between items-center'>
            <div className="flex items-center">
            <div to='/' className="text-white cursor-pointer  sm:text-xl md:text-2xl font-bold">
    My Shopee
</div>

            </div>
            <div className="relative flex-grow mx-4" style={{ maxWidth: '40vw' }}>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md transition-all duration-300 pl-10"
                        placeholder="Search for products, brands and more"
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{
                            padding: '0.75rem 1.5rem',
                            height: '2.75rem',
                            fontSize: '1rem',
                        }}
                    />
                    {/* <FiSearch className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-500" size={18} /> */}
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
                    <div className="absolute scroll w-full lg:h-[45vh] md:h-[35vh] sm:h-[25vh] overflow-y-auto overflow-x-hidden bg-white border border-gray-300 mt-1 shadow-lg rounded-lg z-10 transition-all duration-300 ease-in-out transform origin-top-left scale-95">
                        {suggestions.length === 0 ? (
                            <div className="p-3 text-gray-500 font-bold">No products found</div>
                        ) : (
                            suggestions.map((suggestion, index) => (
                                <div key={index} className="p-3 font-semibold hover:bg-blue-100 cursor-pointer transition-all duration-200">
                                    <Link to={`/singleproduct/${suggestion._id}`} className="block">
                                        {suggestion.name}
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            <div className="flex  items-center space-x-6">
                <Link to="/viewcart" className="text-white hover:text-gray-200 flex items-center space-x-2">
                    <FiShoppingCart style={{ fontSize: '1.5rem' }} />
                    <span style={{ fontSize: '1rem' }}>Cart</span>
                </Link>
                <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                >
                    {token ? (
                        <Link to="#" className="text-white hover:text-gray-200 flex items-center space-x-2">
                        <FaRegUser style={{ fontSize: '1.5rem' }} />
                        <span style={{ fontSize: '1rem' }}>Logout</span>
                    </Link>

                    ):(
                        <Link to="#" className="text-white hover:text-gray-200 flex items-center space-x-2">
                        <FaRegUser style={{ fontSize: '1.5rem' }} />
                        <span style={{ fontSize: '1rem' }}>Login</span>
                    </Link>
                    )}
                    
                    {isDropdownVisible && (
                        <div className="absolute right-0 z-[999] mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg"
                            onMouseLeave={handleMouseLeave}
                        >
                            {token ? (
                                <>
                                    <Link to="/resetpassword" className="block px-4 py-2 hover:bg-gray-100" style={{ fontSize: '1rem' }}>Reset Password</Link>
                                    <Link to="/" onClick={logout} className="block px-4 py-2 hover:bg-gray-100" style={{ fontSize: '1rem' }}>Logout</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-100" style={{ fontSize: '1rem' }}>Sign In</Link>
                                    <Link to="/register" className="block px-4 py-2 hover:bg-gray-100" style={{ fontSize: '1rem' }}>Sign Up</Link>
                                    <Link to="/loginadmin" className="block px-4 py-2 hover:bg-gray-100" style={{ fontSize: '1rem' }}>As Admin</Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
            </div>
        </header>
    );
};

export default Header;
