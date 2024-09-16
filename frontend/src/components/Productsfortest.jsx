
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { LuListFilter } from 'react-icons/lu';
import Header2 from '../components/header2';
import { ClipLoader } from 'react-spinners';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Range, getTrackBackground } from 'react-range';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';

const categories = [
    "All", "Electronics", "Clothing", "Home", "Sports",
    "Kids", "Footwears", "Cosmetics", "Mens", "Womens"
];

const Productsfortest = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenPrice, setDropdownOpenPrice] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [priceRange, setPriceRange] = useState([0, 500000]); // Initial price range
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500000);
    const [noProductsFound, setNoProductsFound] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const initialCategory = query.get('category') || "All";
    const initialPriceRange = query.get('price') || "All";
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    const handleDropdownToggle = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const handleDropdownTogglePrice = () => {
        setDropdownOpenPrice(prevState => !prevState);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        navigate(`/productsforuser?category=${category}`);
        setDropdownOpen(false);
        setSelectedProduct(null);
    };

    const handleApplyPriceFilter = async () => {
        if (minPrice === "" || minPrice === null || maxPrice === "" || maxPrice === null) {
            toast.info("Please Set a Price Range.");
            return;
        }

        try {
            const response = await axios.get(`/products/filterproducts?minPrice=${minPrice}&maxPrice=${maxPrice}`);
            if (response.data.success) {
                setProducts(response.data.products);
                setNoProductsFound(response.data.products.length === 0);
            }
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }

        setDropdownOpenPrice(false);
    };

    const handlePriceRangeChange = (values) => {
        setPriceRange(values);
        setMinPrice(values[0]);
        setMaxPrice(values[1]);
    };

    const handleImageChange = (direction) => {
        if (selectedProduct && selectedProduct.images) {
            const newIndex = (currentImageIndex + direction + selectedProduct.images.length) % selectedProduct.images.length;
            setCurrentImageIndex(newIndex);
        }
    };

    // const handleAddToCart = async (productId) => {
    //     if (!token) {
    //         toast.info('Please log in to add items to your cart.');
    //         return;
    //     }

    //     try {
    //         const response = await axios.post(`/users/user/cart/add?token=${token}`, { productId });
    //         if (response.data.success) {
    //             toast.success('Product added to cart successfully!');
    //         } else {
    //             toast.error('Failed to add product to cart.');
    //         }
    //     } catch (error) {
    //         console.error("Error adding product to cart:", error);
    //         toast.error('Error adding product to cart.');
    //     }
    // };
    const handleAddToCart = async (productId) => {
        if (!token) {
            toast.info('Please log in first to add products to the cart.');
            alert("Please log in first to add products to the cart.");
            navigate("/login")
            return; // Exit the function if no token is present
        }
        try {
            await axios.post(`/users/user/cart/add?token=${token}`, { productId });
            toast.success('Product added successfully!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart.');
        }
    };
    useEffect(() => {
        const fetchProducts = async (category) => {
            try {
                const endpoint = category === "All" ? "/products/all" : `/products/category?category=${category}`;
                const response = await axios.get(endpoint);
                setProducts(response.data.products);
            } catch (error) {
                toast.info('No products found for this category.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts(selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        const fetchProductsByPrice = async () => {
            if (minPrice !== null && maxPrice !== null) {
                try {
                    const response = await axios.get(`/products/filterproducts?minPrice=${minPrice}&maxPrice=${maxPrice}`);
                    if (response.data.success) {
                        setProducts(response.data.products);
                        setNoProductsFound(response.data.products.length === 0);

                    }
                } catch (error) {
                    console.error("Error fetching filtered products:", error);
                }
            }
        };

        fetchProductsByPrice();
    }, [minPrice, maxPrice]);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
            dropdownTriggerRef.current && !dropdownTriggerRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
        if (dropdownRefPrice.current && !dropdownRefPrice.current.contains(event.target) &&
            dropdownTriggerRefPrice.current && !dropdownTriggerRefPrice.current.contains(event.target)) {
            setDropdownOpenPrice(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const dropdownRef = useRef(null);
    const dropdownTriggerRef = useRef(null);
    const dropdownRefPrice = useRef(null);
    const dropdownTriggerRefPrice = useRef(null);
    const backtohome = () =>{
        navigate("/");
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/*  Custom Header*/}
            <Header2 />

            {/* Loader Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <ClipLoader color="#007bff" loading={loading} size={80} />
                </div>
            )}

            {/* Category Filter */}
            <div className="relative flex  mt-4  ml-8 lg:mb-0">
            <FaArrowLeft onClick={backtohome} className="text-gray-500 mx-2 mt-2 hover:text-gray-700 cursor-pointer mr-2" size={24} />
                <button
                    className="relative text-blue-700 flex gap-3 p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
                    onClick={handleDropdownToggle}
                    ref={dropdownTriggerRef}
                >
                    Category Filter
                    <LuListFilter className="w-6 h-6" />

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute mt-8 left-1 w-48 bg-white shadow-lg rounded-lg z-20" ref={dropdownRef}>
                            <ul className="space-y-2 p-2">
                                {categories.map(category => (
                                    <li key={category}>
                                        <button
                                            onClick={() => handleCategorySelect(category)}
                                            className={`w-full p-2 rounded-lg text-left ${selectedCategory === category ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-700 hover:text-white transition duration-300`}
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </button>

                <button
                    className="relative ml-4 text-blue-700 flex gap-3 p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
                    onClick={handleDropdownTogglePrice}
                    ref={dropdownTriggerRefPrice}
                >
                    Price Filter
                    <LuListFilter className="w-6 h-6" />

                    {dropdownOpenPrice && (
                        <div className="absolute mt-8 left-1 w-64 bg-white shadow-lg rounded-lg z-20 p-4" ref={dropdownRefPrice}>
                            <Range
                                values={priceRange}
                                step={100}
                                min={0}
                                max={500000}
                                onChange={handlePriceRangeChange}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '6px',
                                            width: '100%',
                                            background: getTrackBackground({
                                                values: priceRange,
                                                colors: ['#ccc', '#007bff', '#ccc'],
                                                min: 0,
                                                max: 500000,
                                            }),
                                        }}
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '24px',
                                            width: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: '#007bff',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%' }} />
                                    </div>
                                )}
                            />
                            <div className="flex justify-between mt-2 text-sm text-gray-700">
                                <span>{priceRange[0]}</span>
                                <span>{priceRange[1]}</span>
                            </div>
                            <button
                                onClick={handleApplyPriceFilter}
                                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Apply
                            </button>
                        </div>
                    )}
                </button>
            </div>

            {/* Product Grid */}
            <main className="flex-1 p-4 lg:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {noProductsFound ? (
                        <h3 className="text-xl font-semibold text-gray-700">No products found in this price range.</h3>
                    ) : (
                        products.map(product => (
                            // <div
                            //     key={product.id}
                            //     className="bg-white p-4 rounded-lg shadow-md border border-gray-300 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                            //     onClick={() => {
                            //         setSelectedProduct(product);
                            //         setCurrentImageIndex(0); // Reset image index on new product selection
                            //     }}
                            // >
                            //     <img src={product.images[0]} alt={product.name} className="w-full h-56 flex justify-center  items-center overflow-hidden rounded-t-lg" />
                            //     <h3 className="text-lg font-semibold line-clamp-1 mb-2">{product.name}</h3>
                            //     <p className="text-gray-600 mb-2">
                            //         <p className='line-through'>{product.price}</p>
                            //         {product.discount > 0 && (
                            //             <p className="text-sm text-red-500 mb-1">{product.discount}% Off</p>
                            //         )}
                            //     </p>
                            //     <p className="text-gray-800 text-xl font-bold">{product.priceAfterDiscount}</p>
                            //     <button className="bg-blue-700 text-white py-1 px-3 rounded-lg mt-2 hover:bg-blue-900 transition duration-300">
                            //         View Product
                            //     </button>
                            // </div>
                            <div
                                key={product.id}
                                onClick={() => {setSelectedProduct(product);
                                    setCurrentImageIndex(0);}}
                                className="bg-white h-[55vh]  border cursor-pointer border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow  duration-300 ease-in-out transform hover:scale-105 group relative"
                                
                            >
                                {/* Product Image */}
                                <div className="w-full h-56 flex justify-center items-center overflow-hidden rounded-t-lg">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-40 h-40 object-contain transform rotate-12"
                                    />
                                </div>

                                {/* Product Name */}
                                <h3 className="text-center text-md font-semibold mb-2 text-gray-800 line-clamp-1">{product.name}</h3>

                                {/* Price and Discount Section */}
                                <p className="text-center text-gray-600 mb-2 line-through">{`₹${product.price}`}</p>
                                {product.discount > 0 && (
                                    <p className="text-center text-sm text-red-500 mb-1">{`${product.discount}% Off`}</p>
                                )}
                                <p className="text-center text-gray-900 text-xl font-bold">{`₹${product.priceAfterDiscount}`}</p>

                                {/* Icons Section */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 mt-6">
                                    <button onClick={() => handleAddToCart(product._id)} className="w-8 h-8 cursor-pointer rounded-full border border-gray-400 flex justify-center items-center hover:bg-gray-100 transition">

                                        {/* Cart Icon */}
                                        <FaShoppingCart className="text-gray-600 hover:text-yellow-500" />

                                    </button>
                                    <button className="w-8 h-8 rounded-full border border-gray-400 cursor-pointer flex justify-center items-center hover:bg-gray-100 transition">

                                        {/* Wishlist Icon */}
                                        <FaHeart className="text-gray-600 hover:text-red-500" />

                                    </button>
                                    <button onClick={() => {
                                    setSelectedProduct(product);
                                     setCurrentImageIndex(0); // Reset image index on new product selection
                                 }} className="w-8 h-8 cursor-pointer rounded-full border border-gray-400 flex justify-center items-center hover:bg-gray-100 transition">

                                        {/* View Icon */}
                                        <FaEye className="text-gray-600 hover:text-blue-500" />

                                    </button>
                                </div>
                            </div>

                        ))
                    )}
                </div>
            </main>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-4xl relative overflow-y-auto max-h-full">
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-30"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex flex-col lg:flex-row">
                            {/* Image Carousel */}
                            <div className="lg:w-1/2 relative">
                                <button
                                    onClick={() => handleImageChange(-1)}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-600 hover:text-gray-900 p-3 rounded-full shadow-md z-30"
                                >
                                    <FaArrowLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => handleImageChange(1)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-600 hover:text-gray-900 p-3 rounded-full shadow-md z-30"
                                >
                                    <FaArrowRight className="w-6 h-6" />
                                </button>
                                <div className="relative w-full overflow-hidden">
                                    {selectedProduct.images && selectedProduct.images.length > 0 ? (
                                        <img
                                            src={selectedProduct.images[currentImageIndex]}
                                            alt={selectedProduct.name}
                                            className="w-full h-auto object-cover flex justify-center items-center overflow-hidden rounded-t-lg"
                                        />
                                    ) : (
                                        <img
                                            src={selectedProduct.image}
                                            alt={selectedProduct.name}
                                            className="w-full h-auto object-cover flex justify-center items-center overflow-hidden rounded-t-lg"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Product Details */}

                            <div className="lg:w-1/2 lg:pl-8 mt-6 lg:mt-0 bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{selectedProduct.name}</h2>

                                <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">${selectedProduct.priceAfterDiscount}</p>

                                <p className="text-gray-700 text-sm sm:text-lg leading-relaxed mb-6">{selectedProduct.description}</p>

                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleAddToCart(selectedProduct._id, token)}
                                        className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-md"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <ToastContainer />
        </div>
    );
};

export default Productsfortest;