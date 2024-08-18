import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import AccessDenied from './AccessDenied';

import { toast } from 'react-toastify';

const AddProduct = () => {
  const [isAdmin, setIsAdmin] = useState(null)

  
  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      if (token) {
        try {
          const response = await axios.get(`/admins/admin/dashboard?token=${token}`);
          console.log(response);
          setIsAdmin(response.data.user.isAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
          toast.error('Error verifying admin status.');
        }
      } else {
        toast.error('User does not have a token.');
      }
    };

    checkAdminStatus();
  }, []);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: '',
    discount: '',
  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      const response = await axios.post(`/products/add?token=${token}`,product);
      if (response.status === 200) {
        alert('Product added successfully!');
        setProduct({
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          images: '',
          discount: '',
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return isAdmin ?  (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Category</label>
  <select
    name="category"
    value={product.category}
    onChange={handleChange}
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
    required
  >
    <option value="">Select a category</option>
    <option value="electronics">Electronics</option>
    <option value="clothing">Clothing</option>
    <option value="home">Home</option>
    <option value="beauty">Beauty</option>
    <option value="sports">Sports</option>
    <option value="toys">Toys</option>
    <option value="footwear">Footwear</option>
    <option value="cosmetics">Cosmetics</option>
    <option value="mens">Men's</option>
    <option value="womens">Women's</option>
  </select>
</div>


        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Images</label>
          <input
            type="text"
            name="images"
            value={product.images}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Discount</label>
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
    ) : (
      <AccessDenied />
    )
  
};

export default AddProduct;
