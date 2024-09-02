import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { LuListFilter } from 'react-icons/lu';
import Header2 from '../components/header2';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const categories = [
    "All", "Electronics", "Clothing", "Home", "Sports",
    "Kids", "Footwears", "Cosmetics", "Mens", "Womens"
];

const Productsforuser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dropdownTriggerRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const initialCategory = query.get('category') || "All"; 
    const initialPriceRange = query.get('price') || "All";

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedPriceRange, setSelectedPriceRange] = useState(initialPriceRange);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dropdownOpenCategory, setDropdownOpenCategory] = useState(false);
    const [dropdownOpenPrice, setDropdownOpenPrice] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // const [error, setError] = useState(null);
    const dropdownRefCategory = useRef(null);
    const dropdownTriggerRefCategory = useRef(null);
    const [minPrice, setminPrice] = useState()
    const [maxPrice, setmaxPrice] = useState()

    const { id } = useParams();
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    const priceRanges = [
        "All", "0-500", "500-1000", "1000-2000", "2000-5000", "5000+"
    ];

    const filterProductsByPrice = async () => {
        // Check if minPrice or maxPrice are not set
        if (minPrice === "" || minPrice === null  || maxPrice === "" || maxPrice === null) {
            toast.info("PLease Set a Price Range.")
            return; // Exit the function early if the condition is met
        }
      

        try {
            // Perform the API call with the correct query parameters
            const response = await axios.get(`/products/filterproducts?minPrice=${minPrice}&maxPrice=${maxPrice}`);
            console.log(response.data);
            if(response.data.success){
                setProducts(response.data.products)
            }
            // Handle the response as needed (e.g., update the products state)
            // setProducts(response.data);
        } catch (error) {
            // Handle any errors that occur during the API request
            console.error("Error fetching filtered products:", error);
        }
    };
    

    useEffect(() => {
         let  fetchProducts = async (category) => {
            // const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

            try {
                const endpoint = category === "All" ? `/products/all` : `/products/category?category=${category}`;
                const response = await axios.get(endpoint);
                setProducts(response.data.products);
            } catch (error) {
                // console.error('Error fetching products:', error);
                // setError('Failed to load products.');
                toast.info('No Products Found For This Category.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts(selectedCategory);
    }, [selectedCategory]);

    // Handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        navigate(`/productsforuser?category=${category}`); // Update URL with selected category
        setDropdownOpen(false);
        setSelectedProduct(null);
    };

    // Handle Add to Cart
    // const handleAddToCart = () => {
    //     toast.success('Product added successfully!');
    // };
    const handleAddToCart = async (id, token) => {

        try {
            console.log(id);
            const response = await axios.post(
                `/users/user/cart/add?token=${token}`, { productId: id });

            // Handle the response as needed
            console.log('Product added to cart:', response.data);
            toast.success('Product added successfully!');
        } catch (error) {
            // Handle any errors
            console.error('Error adding product to cart:', error);
        }
    };


    // Toggle dropdown visibility
    const handleDropdownToggle = () => {
        setDropdownOpen(prevState => !prevState);
    };
  
    // Close dropdown when clicking outside of it
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current && !dropdownRef.current.contains(event.target) &&
            dropdownTriggerRef.current && !dropdownTriggerRef.current.contains(event.target)
        ) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Change image in carousel
    const handleImageChange = (direction) => {
        if (selectedProduct && selectedProduct.images) {
            const newIndex = (currentImageIndex + direction + selectedProduct.images.length) % selectedProduct.images.length;
            setCurrentImageIndex(newIndex);
        }
    };


   

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Custom Header */}
            <Header2 />

            {/* Loader Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <ClipLoader color="#007bff" loading={loading} size={80} />
                </div>
            )}

            {/* Category Filter */}
            <div className="relative flex  mt-4  ml-8 lg:mb-0">
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
            

                <div className="price-buttons flex gap-3 ml-3">
                <input onChange={(e)=> setminPrice(e.target.value)} value={minPrice} type="number" placeholder='minPrice'  className=" outline-0  rounded-lg px-1 w-fit " />
                <input onChange={(e)=> setmaxPrice(e.target.value)}  value={maxPrice} type="number" placeholder='maxPrice' className=' outline-0 rounded-lg px-1 w-fit' />
                <button onClick={filterProductsByPrice}  className=' px-1 text-sm text-blue-500 font-medium '>Apply</button>
                </div>


            
            </div>

            {/* Product Grid */}
            <main className="flex-1 p-4 lg:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div
                            key={product.id}
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-300 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                            onClick={() => {
                                setSelectedProduct(product);
                                setCurrentImageIndex(0); // Reset image index on new product selection
                            }}
                        >
                            <img src={product.images[0]} alt={product.name} className="w-full h-56 flex justify-center  items-center overflow-hidden rounded-t-lg" />
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-2">
                                <p className='line-through'>{product.price}</p>
                                {product.discount > 0 && (
                                    <p className="text-sm text-red-500 mb-1">{product.discount}% Off</p>
                                )}
                            </p>
                            <p className="text-gray-800 text-xl font-bold">{product.priceAfterDiscount}</p>
                            <button className="bg-blue-700 text-white py-1 px-3 rounded-lg mt-2 hover:bg-blue-900 transition duration-300">
                                View Product
                            </button>
                        </div>
                    ))}
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

export default Productsforuser;




