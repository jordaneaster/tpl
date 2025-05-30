import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Collection of hip-hop related images with direct URLs from Unsplash
const hipHopImages = [
  'https://images.unsplash.com/photo-1624409206359-079753ebabf9?q=80&w=1200&h=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1624409206359-079753ebabf9?q=80&w=1200&h=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1483000805330-4eaf0a0d82da?q=80&w=1200&h=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516916759473-600c07bc12d4?q=80&w=1200&h=800&auto=format&fit=crop',
];

export default function HipHopHero({ title = "Hip-Hop Culture" }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  // Rotate through images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % hipHopImages.length);
      // Reset error state when changing images
      setImageError(false);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Image background with hip-hop aesthetic */}
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          <Image 
            src={hipHopImages[currentImage]}
            alt="Hip-hop culture"
            fill
            priority
            className="object-cover transition-opacity duration-1000"
            sizes="100vw"
            onError={() => setImageError(true)}
          />
        ) : (
          // Fallback background color if image fails to load
          <div className="w-full h-full bg-gradient-to-r from-purple-900 to-blue-900"></div>
        )}
        {/* Overlay for better text contrast */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div> */}
      </div>
      
      {/* Text overlay with hip-hop style */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
            style={{ textShadow: '3px 3px 0px #FF3636' }}>
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white max-w-2xl leading-relaxed">
          Celebrating the culture, music, and artistry that changed the world
        </p>
        <button className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full 
                          hover:from-purple-700 hover:to-blue-600 transform hover:scale-105 transition duration-300">
          Explore Now
        </button>
      </div>
    </div>
  );
}
