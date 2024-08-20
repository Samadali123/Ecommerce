import React, { useState } from 'react';
import axios from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ShopByCategory = () => {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  const categories = [
    { name: "All", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxKSTWC6dyTXAdMMG2v7oy_TIavQ-3QTqIDw&s" },
    { name: "Electronics", image: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Clothing", image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Home", image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9tZSUyMGRlY29yfGVufDB8MHwwfHx8MA%3D%3D" },
    { name: "Sports", image: "https://media.istockphoto.com/id/949190756/photo/various-sport-equipments-on-grass.jpg?s=612x612&w=0&k=20&c=s0Lz_k0Vq_9P6JBETBMtLsK0lSKEHg4Tnqz9KlRCSHA=" },
    { name: "Kids", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlSpgOSsW1Ags51InsPtrNfMs19xjYXWrw_A&s" },
    { name: "Footwears", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Cosmetics", image: "https://images.unsplash.com/photo-1535415493710-bdf0b2dc725e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Mens", image: "https://www.egypte-market.com/wp-content/uploads/2021/02/men-clothing-category.jpeg" },
    { name: "Womens", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5m6caxRHUZWPoD2MsCBMTpIfC4vmWfpdjOqE0hXA86-DlL0tBNuW5qB7noNTfEejBjOE&usqp=CAU" }
  ];

  // Click handler function to redirect based on selected category
  const handleCategoryClick = async (category) => {
    try {
      // Navigate to the Products page with the selected category
      navigate(`/productsforuser?category=${category}`);
      
      // Fetch products for the selected category
      const endpoint = category === "All" ? `/products/all` : `/products/category?category=${category}`;
      const response = await axios.get(endpoint);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products.');
      toast.error('Error fetching products.');
    } finally {
      setLoading(false);
    }
  };

  // Duplicate categories to ensure smooth scrolling
  const duplicatedCategories = [...categories, ...categories];

  return (
    <section className="bg-gray-50 scroll py-16 text-center">
      <h2 className="text-3xl sm:text-4xl mb-8 text-gray-800 font-semibold">Shop by Category</h2>
      <div className="overflow-x-hidden overflow-y-hidden relative">
        <div className="flex space-x-6 px-4 sm:px-6 md:px-8 lg:px-12 animate-marquee">
          {duplicatedCategories.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 cursor-pointer transition-transform transform hover:scale-105 duration-300"
              onClick={() => handleCategoryClick(category.name)} // Attach click handler
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full shadow-md transition-shadow duration-300 hover:shadow-lg"
              />
              <p className="mt-2 text-xs font-medium text-gray-700">{category.name}</p>
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 10s linear infinite;
          }
          section:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}</style>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ShopByCategory;
