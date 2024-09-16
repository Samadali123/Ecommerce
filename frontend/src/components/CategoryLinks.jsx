import React, { useState }  from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function CategoryLinks() {
  const [products, setProducts] = useState([]);
  const categories = [
    // { link: 'All', img: 'https://rukminim1.flixcart.com/flap/480/450/image/033f3268031fa0ba.jpg?q=20' , id:1},
    { link: 'All', img: 'https://rukminim1.flixcart.com/flap/480/450/image/0f3d008be60995d4.jpg?q=20', id:2},
    { link: 'Electronics', img: 'https://rukminim1.flixcart.com/flap/480/450/image/42f9a853f9181279.jpg?q=20', id:3 },
    { link: 'Clothing', img: 'https://rukminim1.flixcart.com/flap/480/450/image/f07bb3e1c1392b47.jpg?q=20', id:4 },
    { link: 'Electronics', img: 'https://rukminim1.flixcart.com/flap/480/450/image/913e96c334d04395.jpg?q=20', id:5 },
    { link: 'Home', img: 'https://rukminim1.flixcart.com/flap/480/450/image/4be8a679014497f0.png?q=20' ,id:6},
    { link: 'Cosmetics', img: 'https://rukminim1.flixcart.com/flap/480/450/image/6ecb75e51b607880.jpg?q=20',id:7 },
    { link: 'Home', img: 'https://rukminim1.flixcart.com/flap/480/450/image/89d809684711712a.jpg?q=20', id:8 },
    { link: 'flights & hotels', img: 'https://rukminim1.flixcart.com/fk-p-flap/480/450/image/4b0a064d53b4ff28.jpg?q=20', id:9 },
    { link: 'Kids', img: 'https://rukminim2.flixcart.com/flap/80/80/image/dff3f7adcf3a90c6.png?q=100' , id:10}
  ];
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const handleCategoryClick = async (category) => {
    try {
      // Navigate to the Products page with the selected category
      navigate(`/productsforuser?category=${category}`);
      
      // Fetch products for the selected category
      const endpoint = category === "All" ? `/products/all` : `/products/category?category=${category}`;
      const response = await axios.get(endpoint);

      setProducts(response.data.products);
      console.log(response.data);
      setProducts([]);
      setProducts(response.data.products)
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products.');
      toast.error('Error fetching products.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-[1rem]  sm:mt-[1rem] lg:mt-1">
      <div className="bg-white sm:px-8 lg:px-16 shadow-2xl">
        <div className="container mx-auto py-2 sm:py-4">
          <div className="flex overflow-x-auto no-scrollbar lg:justify-between">
            {categories.map((category,index) => (
              <div
              onClick={() => handleCategoryClick(category.link)}
              
                className="flex-none m-1 sm:mb-0"
                key={index}
              >
                <img src={category.img} alt={category.link}  className="w-16 h-16 sm:w-20 cursor-pointer sm:h-20 object-contain" />
               
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryLinks;
