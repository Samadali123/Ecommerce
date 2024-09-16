// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { ClipLoader } from 'react-spinners';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../utils/axios';
// import Header2 from './header2';
// import { toast } from 'react-toastify';

// const SingleProduct = () => {
//     const [product, setProduct] = useState(null);
//     const [similarProducts, setSimilarProducts] = useState([]);
//     const [moreProducts, setMoreProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [zoomedImage, setZoomedImage] = useState(null);
//     const { id } = useParams();
    
//     const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProductData = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get(`/products/product/${id}?token=${token}`);
//                 setProduct(response.data.product);
//                 if (response.data.similarProducts && response.data.similarProducts.length > 0) {
//                     setSimilarProducts(response.data.similarProducts);
//                 } else if (response.data.moreProducts && response.data.moreProducts.length > 0) {
//                     setMoreProducts(response.data.moreProducts);
//                 }
//             } catch (error) {
//                 console.error('Error fetching product data:', error);
//                 toast.error('Failed to load product data.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProductData();
//     }, [id, token]);

//     const handleAddToCart = async (productId) => {
//         try {
//             await axios.post(`/users/user/cart/add?token=${token}`, { productId });
//             toast.success('Product added successfully!');
//         } catch (error) {
//             console.error('Error adding product to cart:', error);
//             toast.error('Failed to add product to cart.');
//         }
//     };

//     const handleBuyNow = async (productId) => {
//         try {
//             await handleAddToCart(productId);
//             navigate('/viewcart'); // Redirect to cart page
//         } catch (error) {
//             console.error('Error buying product:', error);
//             toast.error('Failed to buy product.');
//         }
//     };

//     const handleViewProductClick = (productId) => {
//         navigate(`/singleproduct/${productId}`);
//     };

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: false,
//         autoplaySpeed: 3000,
//     };

//     const similarSettings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         responsive: [
//             {
//                 breakpoint: 1280,
//                 settings: {
//                     slidesToShow: 3,
//                 },
//             },
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 1,
//                 },
//             },
//         ],
//     };

//     return (
//         <>
//             <Header2 />
//             <div className="container mx-auto p-6">
//                 <div className="flex flex-col lg:flex-row gap-8">
//                     {/* Product Image and Color Selection */}
//                     <div className="lg:w-6/12">
//                         {product ? (
//                             <>
//                                 <div className="mb-4">
//                                     <Slider {...settings}>
//                                         {product.images && product.images.length > 0 ? (
//                                             product.images.map((image, index) => (
//                                                 <div key={index}>
//                                                     <img
//                                                         src={image}
//                                                         alt={`${product.name} image ${index + 1}`}
//                                                         className="w-full h-[60vh] object-contain rounded-lg shadow-lg"
//                                                         loading="lazy"
//                                                     />
//                                                 </div>
//                                             ))
//                                         ) : (
//                                             <div className="h-72 flex justify-center items-center bg-gray-200 rounded-lg">
//                                                 <p>No images available.</p>
//                                             </div>
//                                         )}
//                                     </Slider>
//                                 </div>
//                                 <div className="flex justify-center gap-4 mb-4">
//                                     {product.images && product.images.map((image, index) => (
//                                         <img
//                                             key={index}
//                                             src={image}
//                                             alt={`Thumbnail ${index + 1}`}
//                                             className="w-16 h-16 object-contain rounded-lg cursor-pointer border border-gray-300"
//                                             onClick={() => setZoomedImage(image)}
//                                         />
//                                     ))}
//                                 </div>
//                                 <div className="flex justify-center items-center gap-4 mb-6">
//                                     {product.colors && product.colors.map((color, index) => (
//                                         <div
//                                             key={index}
//                                             className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300"
//                                             style={{ backgroundColor: color }}
//                                             aria-label={`Color ${color}`}
//                                         />
//                                     ))}
//                                 </div>
//                             </>
//                         ) : (
//                             <div className="h-72 flex justify-center items-center bg-gray-200 rounded-lg">
//                                 <ClipLoader color="#007bff" size={50} />
//                             </div>
//                         )}
//                     </div>

//                     {/* Product Details */}
//                     <div className="lg:w-6/12 flex flex-col justify-between bg-white rounded-lg shadow-lg p-6">
//                         <div>
//                             <h2 className="text-3xl font-bold mb-4">{product?.name || 'Product Title'}</h2>
//                             <p className="text-2xl text-gray-800 mb-4">${product?.priceAfterDiscount || '100.00'}</p>
//                             <p className="text-red-600 mb-4">Discount: {product?.discount || '20% OFF'}</p>
//                             <p className="text-gray-600 mb-6">
//                                 {product?.description || 'This is a description of the product. It provides details about the features and benefits.'}
//                             </p>
//                             <div className="mb-6">
//                                 <p className="text-gray-600">Stock: {product?.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
//                                 <p className="text-gray-600">Free Delivery</p>
//                                 <p className="text-gray-600">30 Days Return Policy</p>
//                             </div>
//                         </div>
//                         <div className="flex gap-4">
//                             <button
//                                 onClick={() => handleBuyNow(product._id)}
//                                 className={`bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300 ${product?.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 disabled={product?.stock <= 0}
//                             >
//                                 Buy Now
//                             </button>
//                             <button
//                                 onClick={() => handleAddToCart(product._id)}
//                                 className={`bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-300 ${product?.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 disabled={product?.stock <= 0}
//                             >
//                                 Add to Cart
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Similar Products */}
//                 <div className="mt-12">
//                     <h3 className="text-2xl font-bold mb-6 ml-8">
//                         {similarProducts.length > 0 ? "Similar Products" : "More Products"}
//                     </h3>
//                     {loading ? (
//                         <div className="flex justify-center items-center h-64">
//                             <ClipLoader color="#007bff" size={50} />
//                         </div>
//                     ) : (
//                         <Slider {...similarSettings}>
//                             {(similarProducts.length > 0 ? similarProducts : moreProducts).map((product) => (
//                                 <div key={product._id} className="p-4">
//                                     <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                                         <div className="flex justify-center items-center h-48">
//                                             <img
//                                                 src={product.images[0]}
//                                                 alt={product.name}
//                                                 className="object-contain h-full w-full"
//                                             />
//                                         </div>
//                                         <div className="p-4">
//                                             <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
//                                             <p className="text-gray-600">${product.priceAfterDiscount}</p>
//                                             <button
//                                                 onClick={() => handleViewProductClick(product._id)}
//                                                 className="bg-blue-600 text-white py-1 px-2 mt-2 rounded hover:bg-blue-800 transition duration-300"
//                                             >
//                                                 View Product
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </Slider>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SingleProduct;



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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { id } = useParams();

    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    const navigate = useNavigate();

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

    const handleAddToCart = async (productId) => {
        try {
            await axios.post(`/users/user/cart/add?token=${token}`, { productId });
            toast.success('Product added successfully!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart.');
        }
    };

    const handleBuyNow = async (productId) => {
        try {
            await handleAddToCart(productId);
            navigate('/viewcart'); // Redirect to cart page
        } catch (error) {
            console.error('Error buying product:', error);
            toast.error('Failed to buy product.');
        }
    };

    const handleViewProductClick = (productId) => {
        navigate(`/singleproduct/${productId}`);
    };

    // Slider settings for main image carousel
    const settings = {
        dots: product?.images?.length > 1,
        infinite: product?.images?.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        beforeChange: (current, next) => setCurrentImageIndex(next),
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

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index); // Change the main image in the carousel
    };

    return (
        <>
            <Header2 />
            <div className="container mx-auto p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Product Image and Thumbnails */}
                    <div className="lg:w-6/12">
                        {product ? (
                            <>
                                <div className="mb-4">
                                    <Slider {...settings} initialSlide={currentImageIndex}>
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

                                {/* Thumbnail Images */}
                                {product.images && product.images.length > 1 && (
                                    <div className="flex justify-center gap-4 mb-4">
                                        {product.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                className={`w-16 h-16 object-contain rounded-lg cursor-pointer border ${currentImageIndex === index ? 'border-blue-500' : 'border-gray-300'}`}
                                                onClick={() => handleThumbnailClick(index)} // Change main image on click
                                            />
                                        ))}
                                    </div>
                                )}
                                <div className="flex justify-center items-center gap-4 mb-6">
                                    {product.colors && product.colors.map((color, index) => (
                                        <div
                                            key={index}
                                            className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300"
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
                            <p className="text-2xl text-gray-800 mb-4">{product?.priceAfterDiscount || '100.00'}</p>
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
                                onClick={() => handleBuyNow(product._id)}
                                className={`bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300 ${product?.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={product?.stock <= 0}
                            >
                                Buy Now
                            </button>
                            <button
                                onClick={() => handleAddToCart(product._id)}
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
                                                alt={product.name}
                                                className="h-full object-contain"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-lg font-semibold line-clamp-1  mb-2">{product.name}</h4>
                                            <p className="text-gray-800 mb-2">{product.priceAfterDiscount}</p>
                                            <button
                                                onClick={() => handleViewProductClick(product._id)}
                                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300 w-full mt-2"
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
            </div>
        </>
    );
};

export default SingleProduct;
