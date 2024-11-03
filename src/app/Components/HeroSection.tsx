// components/HeroSection.tsx

import React from 'react';
import Link from 'next/link'; 
import Image from 'next/image';
import i1 from "../Components/i2.jpg";

const HeroSection: React.FC = () => {
    return (
        <div className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900">
            {/* Background Image */}
            <Image className="w-full h-full absolute z-0 opacity-10 object-cover" src={i1} alt="Background Image" layout="fill" />
            
            {/* Content Section */}
            <div className="z-10 text-center text-white p-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase mb-4 animate-pulse">
                    Welcome to <span className="text-green-400">Al Jannat</span> Banquet Management App
                </h1>
                <p className="text-md sm:text-lg md:text-2xl font-light mb-8 px-4 sm:px-0">
                    Manage events, track expenses, and monitor profits seamlessly
                </p>
                <Link href="/App">
                    <button className="px-6 py-3 text-base sm:text-lg font-semibold text-white bg-green-500 rounded-lg transform transition duration-300 hover:scale-105">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HeroSection;
