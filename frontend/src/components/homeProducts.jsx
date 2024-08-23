import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


const Homeproduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [buttonStyles, setButtonStyles] = useState({});
    const navigate = useNavigate();
    
    const handleViewProductClick = (productId) => {
        navigate(`/singleproduct/${productId}`);
    };

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleMouseEnter = (index) => {
        const randomColor = getRandomColor();
        setHoveredIndex(index);
        setButtonStyles({
            [index]: {
                borderColor: randomColor,
                color: randomColor === '#000000' ? 'white' : 'black',
            },
        });
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
        setButtonStyles({});
    };

    return (
        <section className="py-8 bg-white homeproducts">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Our Latest Products</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer duration-300 ease-in-out transform hover:scale-105"
                            style={{ height: 'auto' }}
                        >
                            <div className="w-full h-48 flex justify-center items-center overflow-hidden rounded-t-lg ">
                                <img
                                    src={product.images}
                                    alt={product.name}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <div className="p-3">
                                <h2 className="text-md font-semibold text-blue-700">{product.name}</h2>
                                <div className="flex justify-between items-center mt-2">
                                    {product.discount > 0 && (
                                        <p className="text-lg font-semibold text-gray-900">₹{product.priceAfterDiscount}</p>
                                    )}
                                    <p className="text-xs text-red-500 line-through">{`₹${product.price}`}</p>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{`${product.discount}% Off`}</p>
                                <Link to={`/singleproduct/${product._id}`}>
                                    <button
                                        onClick={() => handleViewProductClick(product.id)} // Pass the product id here
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                        className="mt-4 w-full px-3 py-1 border rounded transition-colors duration-300 ease-in-out"
                                        style={{
                                            borderColor: hoveredIndex === index ? buttonStyles[index]?.borderColor : 'blue',
                                            color: hoveredIndex === index ? buttonStyles[index]?.color : 'blue',
                                        }}
                                    >
                                        View Product
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Homeproduct;
