// import React from "react";

// const Footer = () => {
//     return (
//         <footer className="bg-gray-100 text-gray-700 py-10">
//             <div className="container mx-auto px-4">
//                 {/* Top Section */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-sm">
//                     <div>
//                         <h3 className="font-semibold mb-3">About</h3>
//                         <ul className="space-y-2">
//                             <li><a href="/about" className="hover:underline">About Us</a></li>
//                             <li><a href="/contact" className="hover:underline">Contact Us</a></li>
//                             <li><a href="/careers" className="hover:underline">Careers</a></li>
//                             <li><a href="/press" className="hover:underline">Press</a></li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h3 className="font-semibold mb-3">Help</h3>
//                         <ul className="space-y-2">
//                             <li><a href="/payments" className="hover:underline">Payments</a></li>
//                             <li><a href="/shipping" className="hover:underline">Shipping</a></li>
//                             <li><a href="/cancellation" className="hover:underline">Cancellation & Returns</a></li>
//                             <li><a href="/faq" className="hover:underline">FAQ</a></li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h3 className="font-semibold mb-3">Policy</h3>
//                         <ul className="space-y-2">
//                             <li><a href="/return-policy" className="hover:underline">Return Policy</a></li>
//                             <li><a href="/terms-of-use" className="hover:underline">Terms Of Use</a></li>
//                             <li><a href="/security" className="hover:underline">Security</a></li>
//                             <li><a href="/privacy" className="hover:underline">Privacy</a></li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h3 className="font-semibold mb-3">Social</h3>
//                         <ul className="space-y-2">
//                             <li><a href="/facebook" className="hover:underline">Facebook</a></li>
//                             <li><a href="/twitter" className="hover:underline">Twitter</a></li>
//                             <li><a href="/youtube" className="hover:underline">YouTube</a></li>
//                             <li><a href="/instagram" className="hover:underline">Instagram</a></li>
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Divider */}
//                 <div className="border-t border-gray-300 my-8"></div>

//                 {/* Bottom Section */}
//                 <div className="flex flex-col lg:flex-row justify-between items-center text-xs space-y-4 lg:space-y-0">
//                     <p>&copy; 2024 Brand Name. All rights reserved.</p>
//                     <div className="flex space-x-6">
//                         <a href="/terms" className="hover:underline">Terms of Service</a>
//                         <a href="/privacy" className="hover:underline">Privacy Policy</a>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;




import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 py-10">
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <a 
                                    href="/about" 
                                    className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
                                >
                                    About Us
                                    <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/services" 
                                    className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
                                >
                                    Services
                                    <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/contact" 
                                    className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
                                >
                                    Contact Us
                                    <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <a 
                                    href="/faq" 
                                    className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
                                >
                                    FAQ
                                    <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/returns" 
                                    className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
                                >
                                    Returns
                                    <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/shipping" 
                                    className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
                                >
                                    Shipping
                                    <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a 
                                    href="/privacy-policy" 
                                    className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
                                >
                                    Privacy Policy
                                    <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="/terms-of-service" 
                                    className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
                                >
                                    Terms of Service
                                    <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-300 my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center text-xs space-y-4 lg:space-y-0">
                    <p className="text-gray-600">&copy; 2024 Brand Name. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a 
                            href="/terms" 
                            className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
                        >
                            Terms of Service
                            <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
                        </a>
                        <a 
                            href="/privacy" 
                            className="relative inline-block pb-1 text-gray-700 hover:text-blue-500 transition-colors duration-300 ease-in-out"
                        >
                            Privacy Policy
                            <span className="absolute left-0 bottom-0 block w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"></span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


