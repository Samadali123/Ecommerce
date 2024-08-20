import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Updateproduct = () => {
  const { productId } = useParams(); // Get productId from URL params
  const navigate = useNavigate(); // For redirecting after success
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [],
    discount: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (token) {
        try {
          const response = await axios.get(`/products/product/${productId}?token=${token}`);
          const productData = response.data.product;
          setProduct({
            ...productData,
            price: productData.price ? String(productData.price) : '', // Convert price to string
          });
        } catch (error) {
          console.error('Error fetching product details:', error.response ? error.response.data : error.message);
          setError('Failed to load product details.');
          toast.error('Error fetching product details.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        toast.error('User does not have a token.');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const logSubmission = () => {
    console.log('Form submitted with the following product details:', product);
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

//     if (token) {
//       try {
//         logSubmission(); // Call the additional function here
//         const {data} = await axios.put(`/products/product/update/${productId}?token=${token}`, product);
//         console.log(data)
//         toast.success('Product updated successfully.');
//         navigate('/products'); // Redirect to products list or another page
//       } catch (error) {
//         console.error('Error updating product:', error.response ? error.response.data : error.message);
//         toast.error('Failed to update product.');
//       }
//     }
//   };



const handleSubmit = async (e) => {
    e.preventDefault();

    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (!token) {
        toast.error('Authentication token not found. Please log in again.');
        console.error('No token found.');
        return;
    }

    try {
        // Call the additional function if needed
        logSubmission();

        // Make the API request to update the product
        const response = await axios.put(`/products/product/update/${productId}?token=${token}`, product);
        
        // Log the response for debugging purposes
        console.log('API Response:', response.data);

        // Show a success message and navigate to the products page
        toast.success('Product updated successfully.');
        navigate('/products');
    } catch (error) {
        // Handle errors and display appropriate messages
        console.error('Error updating product:', error.response ? error.response.data : error.message);
        toast.error('Failed to update product.');
    }
};




  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="update-product-page p-4">
      <h1 className="text-3xl font-bold mb-8">Update Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
          <input
            type="text" // Ensure the input is a text field
            id="price"
            name="price"
            value={product.price} // Set price as a string
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2" htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2" htmlFor="images">Image URL</label>
          <input
            type="text"
            id="images"
            name="images"
            value={product.images} // Access the first image
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 mb-2" htmlFor="discount">Discount (%)</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
        onSubmit={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition-colors duration-300"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Updateproduct;
