import React, { useState } from 'react';
import {
    FaHome,
    FaCartPlus,
    FaUser,
    FaBox,
    FaChartLine,
    FaCogs,
    FaTimes,
    FaBars,
  } from 'react-icons/fa';
  
import { useNavigate,Link } from 'react-router-dom';
import Header2 from './header2';

const Orders = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
    <Header2/>
    <div className="flex scroll h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col space-y-6 p-4 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:w-64`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-white"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes size={24} />
        </button>
        <nav>
          <ul className="space-y-4">
            <Link to='/admin' className="flex items-center space-x-2">
              <FaHome />
              <span  >Dashboard</span>
            </Link>
            <Link to='/orders'className="flex items-center space-x-2">
              <FaCartPlus />
              <span>Orders</span>
            </Link>
            <Link to='/customers' className="flex items-center space-x-2">
              <FaUser />
              <span>Customers</span>
            </Link>
            <Link  to='/products' className="flex items-center space-x-2">
              <FaBox />
              <span>Products</span>
            </Link>
            <Link  to='/addproducts' className="flex items-center space-x-2">
              <FaBox />
              <span>Add Products</span>
            </Link>
            <Link to='/reports' className="flex items-center space-x-2">
              <FaChartLine />
              <span>Reports</span>
            </Link>
            <Link to='/admin/settings' className="flex items-center space-x-2">
              <FaCogs />
              <span>Settings</span>
            </Link>
          </ul>
        </nav>
      </aside>

      {/* Overlay for smaller screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 scroll flex flex-col">
        {/* Top Navigation */}
        <header className="flex items-center justify-between bg-white shadow-lg px-6 py-4">
          <div className="flex items-center">
            <button
              className="text-gray-500 focus:outline-none lg:hidden"
              onClick={toggleSidebar}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 ml-4">Orders</h2>
          </div>
          {/* <div className="flex items-center ml-6">
            <img
              src="/path/to/avatar.jpg"
              alt="User Avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
          </div> */}
        </header>

        {/* Orders Table */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Orders (1320)</h3>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
                Filter
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
                Export
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-hidden bg-white shadow rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fulfillment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(10)].map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #CDHT478
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Customer Name
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Location Info
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                      Paid
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      12 Aug, 2024
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-green-500">
                      Fulfilled
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      $402.87
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default Orders;