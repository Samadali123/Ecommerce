import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import Header2 from './header2';

import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const SingleProduct = () => {
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [moreProducts, setmoreProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [zoomedImage, setZoomedImage] = useState(null);
    const { id } = useParams();
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];


    useEffect(() => {
        const fetchProductData = async () => {
            // const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

            try {
                const response = await axios.get(`/products/product/${id}?token=${token}`);
                console.log(response)
                setProduct(response.data.product);
                if(response.data.similarProducts && response.data.similarProducts.length > 0){
                    setSimilarProducts(response.data.similarProducts);
                }else{
                    if(response.data.moreProducts && response.data.moreProducts.length > 0){
                        setmoreProducts(response.data.moreProducts)

                    }
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);
    const handleAddToCart = async (id,token) => {

        try {
            console.log(id);
          const response = await axios.post(
            `/users/user/cart/add?token=${token}`, {productId:id});
            alert("Product added successfully")
            toast.success('Product added successfully!');
          
          // Handle the response as needed
          console.log('Product added to cart:', response.data);
        } catch (error) {
          // Handle any errors
          console.error('Error adding product to cart:', error);
        }
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
        <Header2/>
        
        <div className="container mx-auto p-6">
            <style>
                {`
                    .slick-slide {
                        padding: 0 10px;
                    }

                    .slick-slide > div {
                        display: flex;
                        justify-content: center;
                    }

                    .slick-dots {
                        bottom: 10px; /* Adjust the position of the dots */
                    }

                    .slick-dots li button:before {
                        color: #007bff; /* Change dot color */
                    }

                    .zoom-img {
                        transition: transform 0.3s ease;
                    }

                    .zoom-img:hover {
                        transform: scale(1.2);
                        cursor: pointer;
                    }

                    .modal {
                        display: ${zoomedImage ? 'flex' : 'none'};
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        justify-content: center;
                        align-items: center;
                        background: rgba(0, 0, 0, 0.7);
                    }

                    .modal-content {
                        position: relative;
                        max-width: 90%;
                        max-height: 80%;
                    }

                    .modal-content img {
                        width: 100%;
                        height: auto;
                        object-fit: cover;
                    }

                    .modal-content button {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background: white;
                        border: none;
                        padding: 10px;
                        border-radius: 50%;
                        cursor: pointer;
                    }
                `}
            </style>

            <div className="flex flex-col lg:flex-row gap-8 pl-5">
                {/* Product Image Carousel */}
                <div className="lg:w-4/12">
                    {product ? (
                        <Slider {...settings}>
                            {product.images.map((image, index) => (
                                <div key={index} className="h-80">
                                    <img
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg shadow-lg zoom-img"
                                        onClick={() => setZoomedImage(image)}
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="h-80 flex justify-center items-center bg-gray-200 rounded-lg">
                            <ClipLoader color="#007bff" size={50} />
                        </div>
                    )}
                </div>
                {/* Product Details */}
                <div className="lg:w-5/12 flex flex-col justify-between p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">{product?.name || 'Product Title'}</h2>
                    <p className="text-xl text-gray-700 mb-4">${product?.price || '100.00'}</p>
                    <p className="text-red-600 mb-4">Discount: {product?.discount || '20% OFF'}</p>
                    <p className="text-gray-600 mb-6">
                        {product?.description || 'This is a description of the product. It provides details about the features and benefits.'}
                    </p>
                    <button
                     onClick={()=> handleAddToCart(product._id, token)}

                        className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Similar Products Carousel */}
            <div className="mt-12">
                
                <h3 className="text-2xl font-bold mb-6 ml-8">
                    {similarProducts && similarProducts.length > 0  ? "Similar Products " :  "More Products"}
                    </h3>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <ClipLoader color="#007bff" size={50} />
                    </div>
                ) : (
                    <Slider {...similarSettings}>
                        {(similarProducts && similarProducts.length > 0 ? similarProducts : moreProducts).map((product) => (
                            <div key={product.id} className="p-4">
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <div className="flex justify-center items-center h-48">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="object-cover max-h-full"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                                        <p className="text-gray-700 mb-2">${product.price}</p>
                                        <button
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
                <div className="modal">
                    <div className="modal-content">
                        <button onClick={() => setZoomedImage(null)}>X</button>
                        <img src={zoomedImage} alt="Zoomed" />
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default SingleProduct;
