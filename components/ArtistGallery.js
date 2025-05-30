import React, { useState } from 'react';
import Image from 'next/image';

// Updated artist data with more reliable image sources
const artists = [
  {
    id: 1,
    name: "Kendrick Lamar",
    image: "https://images.unsplash.com/photo-1547842462-b552abdeb38a?q=80&w=400&h=500&auto=format&fit=crop",
    category: "West Coast"
  },
  {
    id: 2,
    name: "J. Cole",
    image: "https://images.unsplash.com/photo-1609793463612-db1954fbfb34?q=80&w=400&h=500&auto=format&fit=crop",
    category: "East Coast"
  },
  {
    id: 3,
    name: "Tyler, The Creator",
    image: "https://images.unsplash.com/photo-1577982813185-1b27643ef2f9?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Alternative"
  },
  {
    id: 4,
    name: "Megan Thee Stallion",
    image: "https://images.unsplash.com/photo-1495296231482-75620171f758?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Southern"
  },
  {
    id: 5,
    name: "A$AP Rocky",
    image: "https://images.unsplash.com/photo-1527813972756-2890936000e9?q=80&w=400&h=500&auto=format&fit=crop",
    category: "East Coast"
  },
  {
    id: 6,
    name: "Travis Scott",
    image: "https://images.unsplash.com/photo-1573589520639-e2f48b73251d?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Southern"
  },
];

export default function ArtistGallery() {
  // Add state to handle image loading errors
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (artistId) => {
    setImageErrors(prev => ({
      ...prev,
      [artistId]: true
    }));
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white text-center">
          Featured Artists
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div key={artist.id} className="group relative overflow-hidden rounded-lg shadow-xl 
                                         transform transition duration-300 hover:scale-[1.02]">
              <div className="relative h-[400px] w-full bg-gray-800">
                {!imageErrors[artist.id] ? (
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={() => handleImageError(artist.id)}
                  />
                ) : (
                  // Fallback content when image fails to load
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <svg className="w-16 h-16 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <p className="mt-2 text-gray-400">Image unavailable</p>
                    </div>
                  </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
              </div>
              
              {/* Artist info */}
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full mb-2">
                  {artist.category}
                </span>
                <h3 className="text-2xl font-bold text-white">{artist.name}</h3>
                <div className="mt-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition duration-300">
                  <button className="px-4 py-2 bg-white text-black rounded-full text-sm font-bold">
                    View Profile
                  </button>
                  <button className="p-2 bg-green-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
