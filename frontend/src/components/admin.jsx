

import React, { useEffect, useState } from 'react';
import AccessDenied from '../components/AccessDenied';
import Loader from '../components/loader';
import axios from '../utils/axios';
import { toast } from 'react-toastify';

const Admin = () => {
   const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    // Function to check if the user is an admin
    const checkAdminStatus = async () => {
      try {
        // Extract the token from the cookie
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  
        if (token) {
          
         const response = await axios.get(`/admin/dashboard?token=${token}`);
          setIsAdmin(response.data.user.isAdmin)
        } 
        else{
          toast.error("User dont have Token")
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false); // If there's an error, assume the user is not an admin
      } 
    };

    checkAdminStatus();
  }, []);

  
  return (
    isAdmin ? (
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="p-4 text-2xl font-bold">Admin Panel</div>
          <nav className="flex-1 p-4">
            <ul>
              <li className="mb-4">
                <a href="/admin/dashboard" className="hover:text-gray-400">Dashboard</a>
              </li>
              <li className="mb-4">
                <a href="/admin/products" className="hover:text-gray-400">Products</a>
              </li>
              <li className="mb-4">
                <a href="/admin/orders" className="hover:text-gray-400">Orders</a>
              </li>
              <li className="mb-4">
                <a href="/admin/users" className="hover:text-gray-400">Users</a>
              </li>
              <li>
                <a href="/admin/settings" className="hover:text-gray-400">Settings</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-100">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Logout</button>
          </header>
          
          {/* Dashboard Content */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Products</h2>
              <p className="text-2xl">150</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Orders</h2>
              <p className="text-2xl">80</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Users</h2>
              <p className="text-2xl">200</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Sales</h2>
              <p className="text-2xl">$5,000</p>
            </div>
          </section>

          {/* Recent Orders */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2 text-left">Order ID</th>
                  <th className="border-b px-4 py-2 text-left">Customer</th>
                  <th className="border-b px-4 py-2 text-left">Total</th>
                  <th className="border-b px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b px-4 py-2">1</td>
                  <td className="border-b px-4 py-2">John Doe</td>
                  <td className="border-b px-4 py-2">$100</td>
                  <td className="border-b px-4 py-2">Pending</td>
                </tr>
                <tr>
                  <td className="border-b px-4 py-2">2</td>
                  <td className="border-b px-4 py-2">Jane Smith</td>
                  <td className="border-b px-4 py-2">$200</td>
                  <td className="border-b px-4 py-2">Shipped</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    ) : (
      <AccessDenied />
    )
  );
};

export default Admin;