



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const navigate = useNavigate();

    const heroContent = [
        {
            image: 'https://media.istockphoto.com/id/1211554164/photo/3d-render-of-home-appliances-collection-set.jpg?s=612x612&w=0&k=20&c=blm3IyPyZo5ElWLOjI-hFMG-NrKQ0G76JpWGyNttF8s=',
            heading: 'Top-Quality Electronics',
            description: 'Find gadgets that suit your needs.',
        },
        {
            image: 'https://media.istockphoto.com/id/1170380890/photo/christmas-sales-woman-shopping-with-smartphone-by-laptop-in-home-interior-xmas-planning.jpg?s=612x612&w=0&k=20&c=T6jOl-dp2E2QPEy_C7ojY4Qr4-NQZrDbh95zp0ZVbbU=',
            heading: 'Explore New Destinations',
            description: 'Travel gear for your next adventure.',
        },
        {
            image: 'https://media.istockphoto.com/id/1178809236/photo/cozy-bedroom-in-warm-colors-with-painting-a-nightstand-a-pouf-and-a-plaid.jpg?s=612x612&w=0&k=20&c=tjO84PGISq3Scwel9ikOlVyHh7_Xt1Da1_v2tuIiTpE=',
            heading: 'Luxurious Home Decor',
            description: 'Enhance your living space with style.',
        },
        {
            image: 'https://media.istockphoto.com/id/511601062/photo/home-gym-in-luxury-villa-house.jpg?s=612x612&w=0&k=20&c=XRPXnitswI5UumegZXwMlfOgfX1FsijTHliq29emu2g=',
            heading: 'Fitness & Wellness',
            description: 'Equip yourself for a healthier lifestyle.',
        },
        {
            image: 'https://media.istockphoto.com/id/1300424749/photo/diet-plan-with-apple-almond-avocado-and-dumbbell-on-wooden-background.jpg?s=612x612&w=0&k=20&c=gPSWZw-yBCDxjjJ5rMdRSFfscabCSVoyBS8MPcyYIqY=',
            heading: 'Gourmet Foods & Beverages',
            description: 'Delicious treats and premium drinks.',
        },
        {
            image: 'https://media.istockphoto.com/id/117146355/photo/almost.jpg?s=612x612&w=0&k=20&c=FIgHBDvVYG9oU6_iggZim3zKl4mFcwU43wHJU2bdLys=',
            heading: 'Stylish Footwear',
            description: 'Step out in the latest shoes.',
        },
        {
            image: 'https://media.istockphoto.com/id/1182857439/photo/various-hair-dresser-tools.jpg?s=612x612&w=0&k=20&c=dueu9lDWgI4Z92OEFF4tJW1iRoGEicuGAQH-vJkDKBk=',
            heading: 'Beauty Essentials',
            description: 'Must-have products for your skincare routine.',
        },
        {
            image: 'https://media.istockphoto.com/id/1223789420/photo/interface-of-video-distribution-service-subscription-service-streaming-video-communication.jpg?s=612x612&w=0&k=20&c=8u2YqAsqEU3UHkdJZwefcJsIjbc0bM44KlIXVN0D4DQ=',
            heading: 'Innovative Tech Gadgets',
            description: 'Discover cutting-edge technology.',
        },
        {
            image: 'https://media.istockphoto.com/id/924820632/photo/brown-sandals-necklace-straw-hat-and-earrings-isolated-on-white.jpg?s=612x612&w=0&k=20&c=go17ix7cqZoL1y3k6QwrA5KeMAmuQj6UaIS9m7ALrb0=',
            heading: 'Chic Fashion Accessories',
            description: 'Complete your outfit with the perfect accessories.',
        },
        {
            image: 'https://media.istockphoto.com/id/1225553665/photo/elderly-woman-with-caregiver-in-the-needle-crafts-occupational-therapy-for-alzheimers-or.jpg?s=612x612&w=0&k=20&c=uWlGfE-7fuBo9dhLoAMgxVrrkswlHF2dqNWslidnAs0=',
            heading: 'Art & Craft Supplies',
            description: 'Everything you need for your creative projects.',
        },
        
    ];

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
            }, 2000); // Change content every 60 seconds

            return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [isPaused, heroContent.length]);

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };
    const handleClick = () => {
        navigate('/productsforuser');
    };

    return (
        <section className="relative h-[65vh] md:h-[65vh] bg-blue-100 flex  items-center justify-center overflow-hidden">
            {heroContent.map((content, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full  flex items-center justify-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: index === currentIndex ? '0s' : '0.5s' }}
                >
                    <img src={content.image} alt="Hero" className="w-full h-full object-cover items-center opacity-80" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center">
                        <div className={`text-white text-center transition-all duration-1000 ease-in-out transform ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">{content.heading}</h1>
                            <p className="text-sm md:text-lg mt-2">{content.description}</p>
                            <button
                                className="mt-4 px-3 py-2 rounded-2xl text-sm bg-blue-700 hover:bg-blue-900 rounded"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleClick}
                                
                            >
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default HeroSection;

