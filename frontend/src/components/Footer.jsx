

// import React from "react";

// const Footer = () => {
//     return (
//         <footer className="bg-gray-100 text-gray-700 py-10">
//             <div className="container mx-auto px-4">
//                 {/* Top Section */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
//                     <div>
//                         <h3 className="font-semibold mb-4">Company</h3>
//                         <ul className="space-y-2">
//                             <li>
//                                 <a 
//                                     href="/about" 
//                                     className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
//                                 >
//                                     About Us
//                                     <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
//                                 </a>
//                             </li>
//                             <li>
//                                 <a 
//                                     href="/services" 
//                                     className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
//                                 >
//                                     Services
//                                     <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
//                                 </a>
//                             </li>
//                             <li>
//                                 <a 
//                                     href="/contact" 
//                                     className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
//                                 >
//                                     Contact Us
//                                     <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h3 className="font-semibold mb-4">Support</h3>
//                         <ul className="space-y-2">
//                             <li>
//                                 <a 
//                                     href="/faq" 
//                                     className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
//                                 >
//                                     FAQ
//                                     <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
//                                 </a>
//                             </li>
//                             <li>
//                                 <a 
//                                     href="/returns" 
//                                     className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
//                                 >
//                                     Returns
//                                     <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
//                                 </a>
//                             </li>
//                             <li>
//                                 <a 
//                                     href="/shipping" 
//                                     className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
//                                 >
//                                     Shipping
//                                     <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h3 className="font-semibold mb-4">Legal</h3>
//                         <ul className="space-y-2">
//                             <li>
//                                 <a 
//                                     href="/privacy-policy" 
//                                     className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
//                                 >
//                                     Privacy Policy
//                                     <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
//                                 </a>
//                             </li>
//                             <li>
//                                 <a 
//                                     href="/terms-of-service" 
//                                     className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
//                                 >
//                                     Terms of Service
//                                     <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Divider */}
//                 <div className="border-t border-gray-300 my-8"></div>

//                 {/* Bottom Section */}
//                 <div className="flex flex-col lg:flex-row justify-between items-center text-xs space-y-4 lg:space-y-0">
//                     <p className="text-gray-600">&copy; 2024 Brand Name. All rights reserved.</p>
//                     <div className="flex space-x-6">
//                         <a 
//                             href="/terms" 
//                             className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
//                         >
//                             Terms of Service
//                             <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
//                         </a>
//                         <a 
//                             href="/privacy" 
//                             className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
//                         >
//                             Privacy Policy
//                             <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;

import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-900 pt-3">
      <div className="max-w-2xl mx-auto text-white py-2 sm:py-10">
        <div className="text-center">
          <h3 className="text-2xl mb-3 sm:text-3xl">Download our app</h3>
          <p className="text-sm sm:text-base">Shop smarter with exclusive offers and seamless shopping experience.</p>
          <div className="flex flex-col items-center px-16 mt-3 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center border w-full rounded-lg px-4 py-2 cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                className="w-6 sm:w-7"
                alt="Google Play"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-200">Download on</p>
                <p className="text-sm sm:text-base">Google Play Store</p>
              </div>
            </div>
            <div className="flex items-center border w-full rounded-lg px-4 py-2 cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                className="w-6 sm:w-7"
                alt="Apple Store"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-200">Download on</p>
                <p className="text-sm sm:text-base">Apple Store</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-col items-center space-y-4 text-sm text-gray-400 sm:flex-row sm:justify-between sm:space-y-0">
          <p className="order-2 sm:order-1">&copy; My Shoppee, 2024.</p>
          <div className="order-1 sm:order-2 space-x-2">
            <a href="/about" className="hover:underline">About us</a>
            <a href="/contact" className="border-l pl-2 hover:underline">Contact us</a>
            <a href="#" className="border-l pl-2 hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;



