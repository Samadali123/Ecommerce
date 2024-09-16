import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import axios from '../utils/axios';
import { FaArrowLeft } from "react-icons/fa6";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            try {
                const response = await axios.get(`/products/searchproducts?query=${value}`);
                if (response.data && response.data.products) {
                    setSuggestions(response.data.products);
                } else {
                    setSuggestions(['No products found']);
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
    const backtohome = () =>{
        navigate("/");
    }

    return (
        <div className="relative mt-2   flex-grow w-full">
            <div className="relative flex items-center">
                {/* Arrow Icon */}
                <FaArrowLeft onClick={backtohome} className="text-gray-500 mx-2 hover:text-gray-700 cursor-pointer mr-2" size={24} />
                
                {/* Search Input */}
                <input
                    type="text"
                    className="w-full md:w-[100vw] rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md transition-all duration-300 pl-10"
                    placeholder="Search for products, brands and more"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                        padding: '0.75rem 1.5rem',
                        height: '2.75rem',
                        fontSize: '1rem',
                    }}
                />
                
                {/* Clear Button */}
                {searchTerm && (
                    <button
                        className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-500 hover:text-gray-700"
                        onClick={clearSearch}
                    >
                        <FiX size={18} />
                    </button>
                )}
            </div>
            
            {/* Suggestions Dropdown */}
            {searchTerm && (
                <div className="absolute top-full left-0 w-full lg:w-auto lg:h-[45vh] md:h-[35vh] sm:h-[25vh] h-screen overflow-y-auto bg-white border border-gray-300 mt-1 shadow-lg rounded-lg z-10">
                    {error ? (
                        <div className="p-3 text-red-500 font-bold">{error}</div>
                    ) : suggestions.length === 0 ? (
                        <div className="p-3 text-gray-500 font-bold">No products found</div>
                    ) : (
                        suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="p-3 font-semibold hover:bg-blue-100 cursor-pointer transition-all duration-200"
                            >
                                <Link to={`/singleproduct/${suggestion._id}`} className="block">
                                    {suggestion.name}
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
