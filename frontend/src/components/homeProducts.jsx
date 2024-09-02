import React, { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Homeproduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const productRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            if (token || !token) {
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
            } else {
                setLoading(false);
                toast.error('User does not have a token.');
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            gsap.fromTo(
                productRefs.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.homeproducts',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );
        }
    }, [products]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="py-8 bg-white homeproducts">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-700 mb-8">Our Latest Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            ref={(el) => (productRefs.current[index] = el)}
                            className="bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => navigate(`/singleproduct/${product._id}`)} // Navigate to the product page on click
                        >
                            <div className="w-full h-56 flex justify-center items-center overflow-hidden rounded-t-lg">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="p-4">
                                <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h2>
                                <div className="mt-2">
                                    <p className="text-blue-500 text-lg font-bold">{` ₹${product.priceAfterDiscount} `}</p>
                                    <p className="text-gray-500 text-sm line-through mt-1">{`₹${product.price} `}</p>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{`${product.discount}% Off`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Homeproduct;
