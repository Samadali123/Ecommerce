import React, { useState, useContext, useEffect } from 'react';
import { FiShoppingCart, FiX, FiSearch, FiMenu } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import UserContext from '../contexts/usercontext';
import { FaSignInAlt, FaUserPlus, FaUserShield, FaUser, FaHeart,FaBox, FaKey, FaSignOutAlt, FaHome, FaShoppingCart } from 'react-icons/fa';
import { CiSearch } from "react-icons/ci";
import axios from '../utils/axios'; // Import axios for making API calls

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For controlling side navigation
    const navigate = useNavigate(); // Initialize navigate
    const [cart, setCart] = useState([]);


    useEffect( ()=>{
        const fetchCartData = async () => {
            try {
              const { data } = await axios.get(`/users/user/currentuser?token=${token}`);
              if (data) {
                setCart(data.user.mycart.length);
              }
            } catch (error) {
                setCart(0)
              console.error('Error fetching cart data:', error);
            }
          };
          fetchCartData()
         
    },[])

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

    // Toggle Sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const goToSearch = () =>{
        navigate("/search");
    }

    return (
        <header className="bg-gradient-to-r w-full from-blue-500   to-purple-500 px-4 py-2 h-[8vh]">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                <div className="flex  items-center">
                    <button className="text-white py-3 md:hidden" onClick={toggleSidebar}>
                        <FiMenu size={24} />
                    </button>
                    <div to='/' className="text-white  cursor-pointer text-2xl md:text-2xl lg:xl font-bold ml-2">
                        My Shopee
                    </div>
                
                </div>
                <button className="text-white md:hidden pt-2" onClick={goToSearch}>
                <CiSearch  size={26} />
                    </button>
                       
                <div className="relative flex-grow mx-4 hidden md:block" style={{ maxWidth: '40vw' }}>
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
                        <div className="absolute w-full lg:h-[45vh] md:h-[35vh] sm:h-[25vh] overflow-y-auto bg-white border border-gray-300 mt-1 shadow-lg rounded-lg z-10">
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
                <div className="flex items-center space-x-6 hidden md:flex">
                    <Link to="/viewcart" onClick={toggleSidebar} className="relative block text-xl font-semibold text-white">
                        <FaShoppingCart className="inline-block mr-2" />
                        {/* Badge */}
                        <span className="absolute top-0 right-0 block w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {/* Replace 5 with the actual cart item count */}
                              {cart}
                        </span>
                    </Link>
                    <div className="relative" onMouseEnter={handleMouseEnter}>
                        {token ? (
                            <Link to="#" className="text-white hover:text-gray-200 flex items-center space-x-2">
                                <FaRegUser size={24} />

                            </Link>
                        ) : (
                            <Link to="#" className="text-white hover:text-gray-200 flex items-center space-x-2">
                                <FaRegUser size={24} />
                                <span>Login</span>
                            </Link>
                        )}
                        {isDropdownVisible && (
                            <div className="absolute right-0 z-[999] mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg" onMouseLeave={handleMouseLeave}>
                                {token ? (
                                    <>
                                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                            <FaUser className="mr-2" /> {/* User icon */}
                                            My Profile
                                        </Link>
                                        <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                            <FaHeart className="mr-2" /> {/* Heart icon */}
                                            Wishlist (34)
                                        </Link>
                                        <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                            <FaBox className="mr-2" /> {/* Box icon */}
                                            Orders
                                        </Link>
                                        <Link to="/resetpassword" className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                            <FaKey className="mr-2" /> {/* Key icon */}
                                            Reset Password
                                        </Link>
                                        <Link to="/" onClick={logout} className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                            <FaSignOutAlt className="mr-2" /> {/* Logout icon */}
                                            Logout
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                            <FaSignInAlt className="mr-2" /> {/* Sign In icon */}
                                            Sign In
                                        </Link>
                                        <Link to="/register" className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                            <FaUserPlus className="mr-2" /> {/* Sign Up icon */}
                                            Sign Up
                                        </Link>
                                        <Link to="/loginadmin" className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                                            <FaUserShield className="mr-2" /> {/* Admin icon */}
                                            As Admin
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Side Navigation Drawer */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
                <div className="p-4 flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500">
                    <h2 className="text-white text-xl font-bold">Menu</h2>
                    <button onClick={toggleSidebar} className="text-white">
                        <FiX size={24} />
                    </button>
                </div>
                <nav className="p-4 space-y-4">
                    {token ? (
                        <>
                            <Link to="/" onClick={toggleSidebar} className="block text-lg font-semibold text-gray-700 hover:text-blue-500">
                                <FaHome className="inline-block mr-2" /> Home
                            </Link>
                            <Link to="/viewcart" onClick={toggleSidebar} className="block text-lg font-semibold text-gray-700 hover:text-blue-500">
                                <FaShoppingCart className="inline-block mr-2" /> Cart
                            </Link>
                            <Link to="/resetpassword" onClick={toggleSidebar} className="block text-lg font-semibold text-gray-700 hover:text-blue-500">
                                <FaUser className="inline-block mr-2" /> My Profile
                            </Link>
                            <Link to="/resetpassword" onClick={toggleSidebar} className="block text-lg font-semibold text-gray-700 hover:text-blue-500">
                                <FaHeart className="inline-block mr-2" /> Wishlist 34
                            </Link>
                            <Link to="/resetpassword" onClick={toggleSidebar} className="block text-lg font-semibold text-gray-700 hover:text-blue-500">
                                <FaBox className="inline-block mr-2" /> Orders
                            </Link>
                            <Link to="/resetpassword" onClick={toggleSidebar} className="block text-lg font-semibold text-gray-700 hover:text-blue-500">
                                <FaKey className="inline-block mr-2" /> Reset Password
                            </Link>
                            <Link to="/" onClick={() => { toggleSidebar(); logout(); }} className="block text-lg font-semibold text-gray-700 hover:text-blue-500">
                                <FaSignOutAlt className="inline-block mr-2" /> Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={toggleSidebar} className="block text-lg font-semibold text-gray-700 hover:text-blue-500">
                                <FaSignInAlt className="inline-block mr-2" /> Sign In
                            </Link>
                            <Link to="/register" onClick={toggleSidebar} className="block text-lg font-semibold text-gray-700 hover:text-blue-500">
                                <FaUserPlus className="inline-block mr-2" /> Sign Up
                            </Link>
                            <Link to="/loginadmin" onClick={toggleSidebar} className="block text-lg font-semibold text-gray-700 hover:text-blue-500">
                                <FaUserShield className="inline-block mr-2" /> As Admin
                            </Link>
                        </>
                    )}
                </nav>
            </div>

            {/* Overlay for Side Navigation */}
            {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 z-40"></div>}
        </header>
    );
};

export default Header;
