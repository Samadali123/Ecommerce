import React, { useEffect, useState } from 'react';
import axios from '../utils/axios'; // Ensure axios is configured properly
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header2 from '../components/header2'; // Ensure the correct case for importing Header2

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

      if (token) {
        try {
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

  const handleDelete = async (productId) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    if (token) {
      try {
        await axios.delete(`/products/product/delete/${productId}?token=${token}`);
        setProducts(products.filter(product => product._id !== productId));
        toast.success('Product deleted successfully.');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header2 />
      <div className="products-page p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="product-card bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold">{product.price}</p>
              {product.discount > 0 && (
                <p className="text-sm text-red-500 mb-2">Discount: {product.discount}%</p>
              )}
              <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
              <div className="flex space-between mt-1 gap-3">
                <p className={`text-sm mb-2 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                </p>
                <div className="flex gap-4">
                  <Link
                    to={`/updateproduct/${product._id}`} // Pass the product ID to the update page
                    className="text-black hover:text-yellow-600 transition-colors duration-300"
                  >
                    <FaEdit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)} // Handle product deletion
                    className="text-black hover:text-red-600 transition-colors duration-300"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
