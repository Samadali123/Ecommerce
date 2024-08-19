import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';

const Productsforuser = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // Get the token from cookies
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      if (token) {
        try {
          // Make the request with the token in the query parameters
          const response = await axios.get(`/products/all?token=${token}`);
          setProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
          setError('Failed to load products.');
          toast.error('Error fetching products.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        toast.error('User does not have a token.');
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="products-page p-4">
  <h1 className="text-3xl text-center font-bold mb-8">Products</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.isArray(products) && products.length > 0 ? (
      products.map((product) => (
        <div key={product._id} className="product-card bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-fit-cover mb-4 rounded"
          />
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold">{product.price}</p>
          {product.discount > 0 && (
            <p className="text-sm text-red-500 mb-1">Discount: {product.discount}%</p>
          )}
          <p className="text-lg font-bold"><span className='text-sm'>After Discount </span>{product.priceAfterDiscount}</p>
          <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
          <p className={`text-sm mb-2 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
          </p>
          <button className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      ))
    ) : (
      <p>No products available.</p>
    )}
  </div>
</div>

  );
};

export default Productsforuser;
