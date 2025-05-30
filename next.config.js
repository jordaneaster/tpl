/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'media.giphy.com',
      'i.scdn.co', // Spotify album covers
      'images.pexels.com',
      'res.cloudinary.com',
      'source.unsplash.com',
      'media.pitchfork.com',
      'rap-api.herokuapp.com'
    ],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  transpilePackages: ['browserslist'],
  
  webpack: (config, { isServer }) => {
    // Browserslist fix
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: require.resolve('path-browserify'),
    };
    
    // Replace the problematic browserslist module with our mock implementation
    config.resolve.alias = {
      ...config.resolve.alias,
      'browserslist': path.resolve(__dirname, 'browserslist-mock.js'),
    };
    
    return config;
  },
  // Disable source maps in development
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
