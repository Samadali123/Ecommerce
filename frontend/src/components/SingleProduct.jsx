import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ClipLoader } from 'react-spinners';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Header2 from './header2';
import { toast } from 'react-toastify';

const SingleProduct = () => {
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [moreProducts, setMoreProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [zoomedImage, setZoomedImage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/products/product/${id}?token=${token}`);
                setProduct(response.data.product);
                if (response.data.similarProducts && response.data.similarProducts.length > 0) {
                    setSimilarProducts(response.data.similarProducts);
                } else if (response.data.moreProducts && response.data.moreProducts.length > 0) {
                    setMoreProducts(response.data.moreProducts);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
                toast.error('Failed to load product data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id, token]);

    const handleAddToCart = async (id, token) => {
        try {
            await axios.post(`/users/user/cart/add?token=${token}`, { productId: id });
            toast.success('Product added successfully!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart.');
        }
    };

    const handleBuyNow = async (id, token) => {
        try {
            await handleAddToCart(id, token);
            navigate('/viewcart'); // Redirect to checkout page
        } catch (error) {
            console.error('Error buying product:', error);
            toast.error('Failed to buy product.');
        }
    };

    const handleViewProductClick = (productId) => {
        navigate(`/singleproduct/${productId}`);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
    };

    const similarSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <>
            <Header2 />
            <div className="container mx-auto p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Product Image and Color Selection */}
                    <div className="lg:w-6/12">
                        {product ? (
                            <>
                                <div className="mb-4">
                                    <Slider {...settings}>
                                        {product.images && product.images.length > 0 ? (
                                            product.images.map((image, index) => (
                                                <div key={index}>
                                                    <img
                                                        src={image}
                                                        alt={`${product.name} image ${index + 1}`}
                                                        className="w-full h-[60vh] object-contain rounded-lg shadow-lg"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="h-72 flex justify-center items-center bg-gray-200 rounded-lg">
                                                <p>No images available.</p>
                                            </div>
                                        )}
                                    </Slider>
                                </div>
                                <div className="flex justify-center gap-4 mb-4">
                                    {product.images && product.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-16 h-16 object-contain rounded-lg cursor-pointer border border-gray-300"
                                            onClick={() => setZoomedImage(image)}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-center items-center gap-4 mb-6">
                                    {product.colors && product.colors.map((color, index) => (
                                        <div
                                            key={index}
                                            className={`w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300`}
                                            style={{ backgroundColor: color }}
                                            aria-label={`Color ${color}`}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="h-72 flex justify-center items-center bg-gray-200 rounded-lg">
                                <ClipLoader color="#007bff" size={50} />
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="lg:w-6/12 flex flex-col justify-between bg-white rounded-lg shadow-lg p-6">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">{product?.name || 'Product Title'}</h2>
                            <p className="text-2xl text-gray-800 mb-4">${product?.priceAfterDiscount || '100.00'}</p>
                            <p className="text-red-600 mb-4">Discount: {product?.discount || '20% OFF'}</p>
                            <p className="text-gray-600 mb-6">
                                {product?.description || 'This is a description of the product. It provides details about the features and benefits.'}
                            </p>
                            <div className="mb-6">
                                <p className="text-gray-600">Stock: {product?.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
                                <p className="text-gray-600">Free Delivery</p>
                                <p className="text-gray-600">30 Days Return Policy</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleBuyNow(product._id, token)}
                                className={`bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300 ${product?.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={product?.stock <= 0}
                            >
                                Buy Now
                            </button>
                            <button
                                onClick={() => handleAddToCart(product._id, token)}
                                className={`bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-300 ${product?.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={product?.stock <= 0}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-6 ml-8">
                        {similarProducts.length > 0 ? "Similar Products" : "More Products"}
                    </h3>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <ClipLoader color="#007bff" size={50} />
                        </div>
                    ) : (
                        <Slider {...similarSettings}>
                            {(similarProducts.length > 0 ? similarProducts : moreProducts).map((product) => (
                                <div key={product._id} className="p-4">
                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                        <div className="flex justify-center items-center h-48">
                                            <img
                                                src={product.images[0]}
                                                alt={`${product.name} image`}
                                                className="object-cover max-h-full"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                                            <p className="text-gray-700 mb-2">${product.price}</p>
                                            <button
                                                onClick={() => handleViewProductClick(product._id)}
                                                className="bg-blue-700 text-white py-1 px-3 rounded-lg hover:bg-blue-900 transition duration-300"
                                            >
                                                View Product
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>

                {/* Zoomed Image Modal */}
                {zoomedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" role="dialog" aria-modal="true">
                        <div className="relative bg-white rounded-lg p-4 max-w-3xl w-full">
                            <button 
                                onClick={() => setZoomedImage(null)} 
                                className="absolute top-2 right-2 text-gray-700 hover:text-gray-900" 
                                aria-label="Close"
                            >
                                &times;
                            </button>
                            <img src={zoomedImage} alt="Zoomed" className="w-full h-72 object-contain" />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SingleProduct;
