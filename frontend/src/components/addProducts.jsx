import React, { useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const categories = [
  'electronics',
  'clothing',
  'home',
  'cosmetics',
  'mens',
  'womens',
  'kids',
  'sports',
  'All',
];

const AddProducts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category); // Adding category to FormData
    formData.append('stock', data.stock);
    formData.append('discount', data.discount);
    Array.from(data.images).forEach((image) => {
      formData.append('images', image);
    });

    // Extract token from cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    console.log('Token:', token);
    console.log('Selected Category:', data.category);

    try {
      if (!token) {
        toast.error('Authentication token not found. Please log in again.');
        console.error('No token found.');
        return;
      }

      setLoading(true);
      await axios.post(`/products/add?token=${token}`, formData);
      toast.success('Product added successfully.');
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}></div>
      <div className="relative z-10 max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Product name is required' })}
                className={`mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                id="price"
                {...register('price', { required: 'Price is required' })}
                className={`mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  errors.price ? 'border-red-500' : ''
                }`}
              />
              {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                {...register('description', { required: 'Description is required' })}
                className={`mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  errors.description ? 'border-red-500' : ''
                }`}
                rows="4"
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                {...register('category', { required: 'Category is required' })}
                className={`mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  errors.category ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                id="stock"
                {...register('stock', { required: 'Stock is required' })}
                className={`mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  errors.stock ? 'border-red-500' : ''
                }`}
              />
              {errors.stock && <span className="text-red-500 text-sm">{errors.stock.message}</span>}
            </div>

            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
              <input
                type="number"
                id="discount"
                {...register('discount')}
                className={`mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  errors.discount ? 'border-red-500' : ''
                }`}
              />
              {errors.discount && <span className="text-red-500 text-sm">{errors.discount.message}</span>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
              <input
                type="file"
                id="images"
                {...register('images', { required: 'At least one image is required' })}
                className={`mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:text-sm hover:file:bg-blue-600 transition-all duration-300 ${
                  errors.images ? 'border-red-500' : ''
                }`}
                multiple
              />
              {errors.images && <span className="text-red-500 text-sm">{errors.images.message}</span>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
