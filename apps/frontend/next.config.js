/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React StrictMode for development best practices
  reactStrictMode: true,
  
  // Configure transpilation to handle monorepo workspace packages
  transpilePackages: ['shared'],
  
  // Add environment variables that need to be exposed to the browser
  // All variables must be prefixed with NEXT_PUBLIC_
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
  },

  // Disable image optimization if you're not using Next.js image component
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Modify webpack config if needed
  webpack: (config) => {
    // Handle specific monorepo needs
    return config;
  }
};

module.exports = nextConfig;
