
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
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
import React, { useEffect,useContext, useState } from 'react';
import AccessDenied from '../components/AccessDenied';
import Loader from '../components/loader';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import UserContext from '../contexts/usercontext';
import { useNavigate,Link } from 'react-router-dom';
import Header2 from './header2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Activity',
        data: [300, 400, 350, 500, 600, 700],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const balanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Balance',
        data: [52422, 51300, 53000, 54500, 50000, 52422],
        borderColor: '#8884d8',
        backgroundColor: 'rgba(136, 132, 216, 0.2)',
        fill: true,
      },
    ],
  };
  const [isAdmin, setIsAdmin] = useState(false)
   const [adminisAuthenticated, setadminIsAuthenticated] = useContext(UserContext);
   const navigate = useNavigate();
  useEffect(() => {
    // Function to check if the user is an admin
    const checkAdminStatus = async () => {
      try {
        // Extract the token from the cookie
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  
        if (token) {
          
         const response = await axios.get(`/admins/admin/dashboard?token=${token}`);
         console.log(response)
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
  const logout = async () => {
    // Extract the token from the cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      try {
        // Perform the logout request with the token in the body
        await axios.get(`admins/admin/logout?token=${token}`);
        // Clear the token cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';

        // Update the authentication state and navigate to the login page
        setadminIsAuthenticated(false);
        navigate('/loginadmin');
      } catch (error) {
        console.error('Logout error:', error);
        toast.error('Error during logout. Please try again.');
      }
    } else {
      toast.info('Please sign in to sign out.');
    }
  };


  return (
    isAdmin ? (
      <>
      <Header2/>
    <div className="flex scroll h-screen">
      {/* Side Navigation */}
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

      {/* Main Content */}
      <div
        className={`flex-1 p-6 space-y-6 bg-gray-50 overflow-y-scroll transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-full' : 'md:w-4/5'
        }`}
      >
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars size={24} />
          </button>
          <h1 className="lg:text-2xl md:text-sm whitespace-nowrap  font-bold w-full text-center md:text-left md:w-auto">
            Welcome to ApnaMart Dashboard!
          </h1>
         
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-200 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">Activity</h2>
            <Line data={activityData} />
            <p className="text-3xl font-bold mt-2">$540.50</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">Spent this month</h2>
            <p className="text-3xl font-bold mt-2">$682.5</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">Earnings</h2>
            <p className="text-3xl font-bold mt-2">$350.40</p>
          </div>
        </div>

        {/* Balance Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Balance</h2>
          <div className="flex justify-between mt-4">
            <div>
              <p className="text-sm text-gray-500">Saves</p>
              <p className="text-2xl font-bold">43.50%</p>
              <p className="text-green-500">+2.45%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Balance</p>
              <p className="text-2xl font-bold">$52,422</p>
              <p className="text-red-500">-4.75%</p>
            </div>
          </div>
          <Line data={balanceData} />
        </div>

        {/* Transfers Section */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <div className="bg-blue-200 p-6 rounded-lg shadow-md flex-1">
            <h2 className="text-lg font-semibold">Credit Balance</h2>
            <p className="text-3xl font-bold mt-2">$25,215</p>
            <ul className="mt-4 space-y-2">
              <li className="flex justify-between">
                <span>Bill & Taxes</span>
                <span className="text-red-500">-$154.50</span>
              </li>
              <li className="flex justify-between">
                <span>Car Energy</span>
                <span className="text-red-500">-$40.50</span>
              </li>
              <li className="flex justify-between">
                <span>Design Course</span>
                <span className="text-red-500">-$70.00</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <h2 className="text-lg font-semibold">Your Transfers</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex justify-between">
                <span>From Alex Manda</span>
                <span className="text-green-500">+$50</span>
              </li>
              <li className="flex justify-between">
                <span>To Laura Santos</span>
                <span className="text-red-500">-$27</span>
              </li>
              <li className="flex justify-between">
                <span>From Jadon S.</span>
                <span className="text-green-500">+$157</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
    ) : (
      <AccessDenied />
    )
  );
};

export default Admin;