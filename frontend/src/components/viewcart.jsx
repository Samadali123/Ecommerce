


import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Header2 from '../components/header2';

const ViewCart = () => {
    const [cart, setCart] = useState([]);
    const [loadingCart, setLoadingCart] = useState(true);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        // Fetch cart and recommended products from the API
        const fetchProducts = async () => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

            if (token) {
                try {
                    const response = await axios.get(`/users/user/cart/view?token=${token}`);
                    console.log(response);

                    setCart(response.data.carts);
                    setRecommendedProducts(response.data.randomProducts);

                } catch (error) {
                    console.error('Error fetching products:', error);
                    setError('Failed to load products.');
                    toast.error('Error fetching products.');
                } finally {
                    setLoadingCart(false);
                    setLoadingProducts(false);
                }
            } else {
                setLoadingCart(false);
                setLoadingProducts(false);
                toast.error('User does not have a token.');
            }
        };

        fetchProducts();
    }, []);

    const handleRemove = (id) => {
        setCart(cart.filter(item => item._id !== id));
    };

    const handleQuantityChange = (id, newQuantity) => {
        setCart(cart.map(item => item._id === id ? { ...item, quantity: newQuantity } : item));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price - item.discount) , 0).toFixed(2);
    };

    const platformFee = 10.00; // Example fee
    const deliveryCharges = 5.00; // Example delivery charge

    const calculateFinalAmount = () => {
        return (parseFloat(calculateTotal()) + platformFee + deliveryCharges).toFixed(2);
    };

    const calculateDiscountPercentage = (price, discount) => {
        return ((discount / price) * 100).toFixed(0);
    };

    const handlePlaceOrder = () => {
        // Implement your order placement logic here
        alert('Order placed successfully!');
    };

    return (<>
    <Header2 />
    
        <div className="flex flex-col min-h-screen bg-gray-50">
            
            <main className="flex-1 p-4 lg:p-6">
                {loadingCart ? (
                    <div className="flex justify-center items-center h-64">
                        <ClipLoader color="#3B82F6" size={50} />
                    </div>
                ) : cart && cart.length === 0 ? (
                    <div className="text-center text-gray-600">
                        <p className="text-lg font-semibold">No products in the cart.</p>
                    </div>
                ) : (
                    <div>
                        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md mb-6">
                            {cart && cart.length > 0 && cart.map(item => (
                                <div key={item._id} className="flex flex-col md:flex-row items-start border-b rounded-md overflow-hidden border-gray-200 pb-4 mb-4 last:mb-0">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-full md:w-32 h-auto object-cover rounded-md mb-4 md:mb-0 md:mr-4"
                                    />
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p className="text-gray-600">
                                            <span className="text-red-600 font-semibold mr-2">{item.discount}% OFF</span>
                                            <span className="line-through text-gray-400">{item.price}</span>
                                        </p>
                                        <p className="text-gray-800">
                                            Final Price : <span className="text-green-600 font-semibold">{item.priceAfterDiscount}</span>
                                        </p>
                                        <div className="flex flex-col md:flex-row items-center mt-2">
                                            <button
                                                onClick={() => handleRemove(item._id)}
                                                className="px-3 py-1 text-sm bg-red-600 text-white rounded-md mb-2 md:mb-0 md:mr-4"
                                            >
                                                Remove
                                            </button>
                                            <div className="flex items-center space-x-2 mb-2 md:mb-0">
                                                <span className="mr-2">Qty:</span>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                                    className="w-16 p-1 border rounded-md"
                                                    min="1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row justify-between mb-2">
                                    <span>Total Price:</span>
                                    <span>{calculateTotal()}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between mb-2">
                                    <span>Platform Fee:</span>
                                    <span>{platformFee.toFixed(2)}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between mb-2">
                                    <span>Delivery Charges:</span>
                                    <span>{deliveryCharges.toFixed(2)}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between font-semibold">
                                    <span>Final Amount:</span>
                                    <span>{calculateFinalAmount()}</span>
                                </div>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                )}

                {recommendedProducts && recommendedProducts.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Recommended Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {loadingProducts ? (
                                <div className="flex justify-center items-center h-64">
                                    <ClipLoader color="#3B82F6" size={50} />
                                </div>
                            ) : (
                                recommendedProducts.map(product => (
                                    <div key={product._id} className="bg-white cursor-pointer p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-48 mb-4 rounded-md object-contain"
                                        />
                                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                        <p className="text-gray-600">{product.priceAfterDiscount}</p>
                                        <button
                                            className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            View Product
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>
            <footer className="bg-blue-800 text-white p-4 lg:p-6 text-center">
                <p>&copy; {new Date().getFullYear()} My E-commerce Site</p>
            </footer>
        </div> </>
    );
};

export default ViewCart;
