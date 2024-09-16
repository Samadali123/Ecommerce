import React, { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Homeproduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const productRefs = useRef([]);
    const navigate = useNavigate();
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    useEffect(() => {
        const fetchProducts = async () => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            try {
                const response = await axios.get(`/products/all?token=${token}`);
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products.');
                toast.error('Error fetching products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
    

    // Filtering functions
    // const topRated = products.filter(product => product.rating >= 4); // Example for top-rated products
    const topRated = products.sort((a, b) => b.salesCount - a.salesCount).slice(0, 4); // Example for top-rated products
    const mostPopular = products.sort((a, b) => b.salesCount - a.salesCount).slice(4, 8); // Most popular by salesCount or a popularity metric
    const newArrivals = products.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).slice(9, 13); // New arrivals based on release date

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const renderProductCard = (product, index) => (
        <div
            key={index}
            
            ref={(el) => (productRefs.current[index] = el)}
            className="border bg-slate-200/10  backdrop-blur border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow  duration-300 ease-in-out transform hover:scale-105 group relative"
        >
            <div onClick={() => navigate(`/singleproduct/${product._id}`)} className="w-full h-56  cursor-pointer flex justify-center  items-center overflow-hidden rounded-t-lg">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-40 h-40 mix-blend-multiply object-contain transform rotate-12"
                />
            </div>
            <div className="p-4 text-center">
                <h2 className="text-sm  font-semibold text-gray-700 mb-2 line-clamp-1">{product.name}</h2>
                <div className="pricendiscount mb-1 flex justify-center items-center gap-4">
                    <p className="text-gray-800 text-sm font-bold ">{`${product.discount}% Off`}</p>
                    <p className="text-gray-400 text-sm line-through">{`₹${product.price}`}</p>
                </div>
                <p className=" bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-lg font-bold mb-10 ">{`₹${product.priceAfterDiscount}`}</p>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 mt-6">
                    <div onClick={() => handleAddToCart(product._id)} className="w-8 h-8 cursor-pointer rounded-full border border-gray-400 flex justify-center items-center hover:bg-gray-100 transition">
                        <FaShoppingCart className="text-gray-600 hover:text-yellow-500" />
                    </div>
                    <div className="w-8 h-8 rounded-full border border-gray-400 cursor-pointer flex justify-center items-center hover:bg-gray-100 transition">
                        <FaHeart className="text-gray-600 hover:text-red-500" />
                    </div>
                    <div onClick={() => navigate(`/singleproduct/${product._id}`)} className="w-8 h-8 cursor-pointer rounded-full border border-gray-400 flex justify-center items-center hover:bg-gray-100 transition">
                        <FaEye className="text-gray-600 hover:text-blue-500" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="py-8  ">
            <div className="container  mx-auto px-4">
                {/* <h2 className="text-3xl font-bold text-gray-700 mb-8">Our Latest Products</h2> */}
                
                {/* Top Rated Section */}
                <div className="mb-12">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">Top Rated</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topRated.map((product, index) => renderProductCard(product, index))}
                    </div>
                </div>

                {/* Most Popular Section */}
                <div className="mb-12">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">Most Popular</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mostPopular.map((product, index) => renderProductCard(product, index))}
                    </div>
                </div>

                {/* New Arrivals Section */}
                <div className="mb-12">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">New Arrivals</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {newArrivals.map((product, index) => renderProductCard(product, index))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Homeproduct;
