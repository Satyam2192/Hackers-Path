/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['images.unsplash.com', "plus.unsplash.com", "cdn-icons-png.flaticon.com"],
  },
  async rewrites() { 
    return [
      {
        source: '/api/v1/:path*', // Capture any path after /api/v1
        destination: 'https://sk-hackers-path.onrender.com/:path*' // Forward the path to your backend
      }
    ]
  },
};