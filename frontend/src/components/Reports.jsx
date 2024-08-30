import React from 'react';

const Reports = () => {
  const data = {
    totalSales: 987654,
    totalOrders: 1200,
    totalCustomers: 450,
    totalProducts: 150,
    salesGrowth: 15, // Percentage
    ordersGrowth: 10, // Percentage
    customersGrowth: 8, // Percentage
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">Reports</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-700">Total Sales</h3>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-blue-600">
              ${data.totalSales.toLocaleString()}
            </p>
          </div>
          <p className="mt-4 text-sm text-green-500">
            +{data.salesGrowth}% Growth
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-700">Total Orders</h3>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-blue-600">
              {data.totalOrders.toLocaleString()}
            </p>
          </div>
          <p className="mt-4 text-sm text-green-500">
            +{data.ordersGrowth}% Growth
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-700">Total Customers</h3>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-blue-600">
              {data.totalCustomers.toLocaleString()}
            </p>
          </div>
          <p className="mt-4 text-sm text-green-500">
            +{data.customersGrowth}% Growth
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-700">Total Products</h3>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-blue-600">
              {data.totalProducts.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Reports Section */}
      <div className="mt-8 sm:mt-10 bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Detailed Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-blue-100 p-3 sm:p-4 rounded-lg shadow-sm">
            <h4 className="text-base sm:text-lg font-medium text-gray-700">Monthly Sales</h4>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-blue-600">${(data.totalSales / 12).toFixed(2)}</p>
          </div>
          <div className="bg-blue-100 p-3 sm:p-4 rounded-lg shadow-sm">
            <h4 className="text-base sm:text-lg font-medium text-gray-700">Monthly Orders</h4>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-blue-600">{(data.totalOrders / 12).toFixed(0)}</p>
          </div>
          <div className="bg-blue-100 p-3 sm:p-4 rounded-lg shadow-sm">
            <h4 className="text-base sm:text-lg font-medium text-gray-700">New Customers</h4>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-blue-600">+{Math.floor(data.totalCustomers / 12)}</p>
          </div>
          <div className="bg-blue-100 p-3 sm:p-4 rounded-lg shadow-sm">
            <h4 className="text-base sm:text-lg font-medium text-gray-700">Average Order Value</h4>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-blue-600">${(data.totalSales / data.totalOrders).toFixed(2)}</p>
          </div>
          <div className="bg-blue-100 p-3 sm:p-4 rounded-lg shadow-sm">
            <h4 className="text-base sm:text-lg font-medium text-gray-700">Product Inventory Value</h4>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-blue-600">${(data.totalProducts * 50).toLocaleString()}</p>
          </div>
          <div className="bg-blue-100 p-3 sm:p-4 rounded-lg shadow-sm">
            <h4 className="text-base sm:text-lg font-medium text-gray-700">Repeat Customers</h4>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-blue-600">45%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;