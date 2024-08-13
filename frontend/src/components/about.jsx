


import React, { useContext } from 'react';
import IsLoggedIn from '../components/isloggedin';
import UserContext from '../contexts/usercontext';

const AboutUs = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  

  return (
    isAuthenticated ? (
      <div className="about-us bg-gray-100 text-gray-900 py-16 px-4 md:px-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl leading-relaxed">
            We are dedicated to bringing you the best products and services with the highest level of customer satisfaction.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-12">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4 text-center">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              Our mission is to deliver top-quality products while ensuring exceptional customer service. We strive to exceed expectations and make a positive impact on our community and the world.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 text-center">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-80 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="Team Member 1"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-center">Jane Doe</h3>
              <p className="text-gray-600 text-center">CEO</p>
              <p className="mt-2 text-gray-800 text-center">
                Jane leads our team with a vision to revolutionize the industry and enhance customer satisfaction.
              </p>
            </div>

            <div className="w-80 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Team Member 2"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-center">John Smith</h3>
              <p className="text-gray-600 text-center">CTO</p>
              <p className="mt-2 text-gray-800 text-center">
                John drives our technology strategy and ensures we stay ahead with innovative solutions.
              </p>
            </div>

            <div className="w-80 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <img
                src="https://randomuser.me/api/portraits/men/2.jpg"
                alt="Team Member 3"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-center">Emily Johnson</h3>
              <p className="text-gray-600 text-center">Marketing Manager</p>
              <p className="mt-2 text-gray-800 text-center">
                Emily crafts our brand story and drives our marketing efforts to connect with customers effectively.
              </p>
            </div>
          </div>
        </section>
      </div>
    ) : (
      <IsLoggedIn />
    )
  );
  
};

export default AboutUs;

