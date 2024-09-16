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
import { FaShippingFast, FaHeadset, FaShoppingCart, FaGift, FaStar, FaStarHalfAlt } from 'react-icons/fa';
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

    const [reviews, setReviews] = useState([]);
    const [ratingData, setRatingData] = useState(null);

    const defaultReviews = [
        {
            user: { name: "Emily Selman", avatar: "https://via.placeholder.com/40" },
            rating: 5,
            comment:
                "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the long flights.",
        },
        {
            user: { name: "Hector Gibbons", avatar: "https://via.placeholder.com/40" },
            rating: 5,
            comment:
                "Before getting the Ruck Snack, I struggled with pulverized snacks and crumbs. Now, I stow my snacks with confidence!",
        },
        {
            user: { name: "Mark Edwards", avatar: "https://via.placeholder.com/40" },
            rating: 4,
            comment:
                "I love how versatile this bag is. It can hold anything ranging from cookies in trays to cookies in tins.",
        },
    ];

    const defaultRatingData = {
        average: 4.5,
        totalReviews: 1624,
        ratings: [
            { stars: 5, percentage: 63 },
            { stars: 4, percentage: 10 },
            { stars: 3, percentage: 6 },
            { stars: 2, percentage: 12 },
            { stars: 1, percentage: 9 },
        ],
    };
    useEffect(() => {
        // Fetch reviews from the API
        axios.get('https://api.example.com/reviews')
            .then(response => {
                setReviews(response.data.reviews);
                setRatingData(response.data.ratingData);
            })
            .catch(error => {
                console.error('Error fetching the reviews, using default reviews:', error);
                // Set default reviews in case of error
                setReviews(defaultReviews);
                setRatingData(defaultRatingData);
            });
    }, []);

    if (!ratingData || reviews.length === 0) {
        return <div>Loading...</div>;
    }


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
                                                        className="w-full h-[60vh] object-contain rounded-lg "
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
                                                className={`w-16 h-16 object-contain rounded-lg cursor-pointer opacity-0 border ${currentImageIndex === index ? 'border-blue-500' : 'border-gray-300'}`}
                                                onClick={() => handleThumbnailClick(index)} // Change main image on click
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="h-72 flex justify-center items-center bg-gray-200 rounded-lg">
                                <ClipLoader color="#007bff" size={50} />
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="lg:w-6/12 flex flex-col justify-between  rounded-lg h-96 p-6">
                        <div>
                            {/* Product Title, Price, and Rating */}
                            <div className="mb-6">
                                <h2 className="text-4xl font-semibold mb-2">{product?.name || 'Product Title'}</h2>
                                <div className="flex items-center mb-2">
                                    <p className="text-2xl text-gray-800 font-semibold mr-2">{product?.priceAfterDiscount || '$100.00'}</p>
                                    <div className="flex items-center">
                                        <span className="text-yellow-400">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                                        <p className="ml-2 text-gray-500">{product?.reviews || '1624 reviews'}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">{product?.description || 'Product description.'}</p>
                            </div>

                            {/* Stock Info */}
                            <div className="mb-6">
                                <p className="text-green-600 font-semibold flex items-center">
                                    <span className="mr-2">&#10003;</span> In stock and ready to ship
                                </p>
                            </div>

                            {/* Size Options */}
                            {/* <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-2">Size</h4>
                                <div className="flex space-x-4">
                                    <div className="p-2 border rounded-lg text-center cursor-pointer">
                                        <p className="text-xl font-bold"></p>
                                        <p className="text-gray-500">Perfect for a reasonable amount of snacks.</p>
                                    </div>
                                    <div className="p-2 border rounded-lg text-center cursor-pointer">
                                        <p className="text-xl font-bold"></p>
                                        <p className="text-gray-500">Enough room for a serious amount of snacks.</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        {/* Add to Cart Button */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleBuyNow(product._id)}
                                className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ${product?.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={product?.stock <= 0}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                {/* icons in middle  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8 ">
                    {/* Free Delivery */}
                    <div className="text-center">
                        <div className="mb-4">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mx-auto flex items-center justify-center">
                                <FaShippingFast className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold">Free delivery all year long</h3>
                        <p className="text-gray-500 mt-2">
                            Name another place that offers year-long free delivery? We’ll be waiting. Order now and you’ll get delivery absolutely free.
                        </p>
                    </div>

                    {/* 24/7 Customer Support */}
                    <div className="text-center">
                        <div className="mb-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full mx-auto flex items-center justify-center">
                                <FaHeadset className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold">24/7 Customer Support</h3>
                        <p className="text-gray-500 mt-2">
                            Or so we want you to believe. In reality, our chat widget is powered by a naive series of if/else statements that churn out canned responses. Guaranteed to irritate.
                        </p>
                    </div>

                    {/* Fast Shopping Cart */}
                    <div className="text-center">
                        <div className="mb-4">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full mx-auto flex items-center justify-center">
                                <FaShoppingCart className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold">Fast Shopping Cart</h3>
                        <p className="text-gray-500 mt-2">
                            Look at the cart in that icon, there's never been a faster cart. What does this mean for the actual checkout experience? I don't know.
                        </p>
                    </div>

                    {/* Gift Cards */}
                    <div className="text-center">
                        <div className="mb-4">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center">
                                <FaGift className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold">Gift Cards</h3>
                        <p className="text-gray-500 mt-2">
                            We sell these hoping that you will buy them for your friends and they will never actually use it. Free money for us, it's great.
                        </p>
                    </div>
                </div>
                {/* Reviews */}
                <div className="p-8 bg-gray-50 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Rating Breakdown */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStarHalfAlt className="text-yellow-400" />
                            </div>
                            <span className="ml-2 text-lg font-semibold">
                                {ratingData.average} based on {ratingData.totalReviews} reviews
                            </span>
                        </div>

                        {/* Rating Bars */}
                        {ratingData.ratings.map((rating, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <FaStar className="text-yellow-400" />
                                <span className="ml-2 text-sm font-medium">{rating.stars}</span>
                                <div className="w-full h-2 bg-gray-200 rounded-full mx-4">
                                    <div
                                        className="h-full bg-yellow-400 rounded-full"
                                        style={{ width: `${rating.percentage}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-medium">{rating.percentage}%</span>
                            </div>
                        ))}

                        {/* Write a review button */}
                        <div className="mt-6">
                            <h3 className="font-bold">Share your thoughts</h3>
                            <p className="text-gray-500 text-sm">
                                If you've used this product, share your thoughts with other customers.
                            </p>
                            <button className="mt-2 py-2 px-4 border border-gray-300 rounded-lg text-sm">
                                Write a review
                            </button>
                        </div>
                    </div>

                    {/* Individual Reviews */}
                    <div>
                        {reviews.map((review, index) => (
                            <div key={index} className="mb-8">
                                <div className="flex items-center mb-2">
                                    <img
                                        src={review.user.avatar}
                                        alt={review.user.name}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div>
                                        <h4 className="font-bold">{review.user.name}</h4>
                                        <div className="flex items-center">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`text-yellow-400 ${i < review.rating ? '' : 'opacity-50'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

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
