/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['images.unsplash.com', "plus.unsplash.com", "cdn-icons-png.flaticon.com","i.ibb.co"],
  },
  async rewrites() { 
    return [
      {
        source: '/api/v1/:path*', 
        destination: 'https://sk-hackers-path.onrender.com/:path*' 
      }
    ]
  },
};