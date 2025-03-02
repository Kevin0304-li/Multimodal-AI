/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Use the App Router as our primary approach
  // but keep Pages Router for backward compatibility
  
  images: {
    domains: ['example.com', 'localhost'],
  },
  
  // API routes will be handled by our FastAPI backend
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 