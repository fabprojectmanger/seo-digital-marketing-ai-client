/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // Wildcard for any hostname
          },
          {
            protocol: 'http',
            hostname: '**', // Wildcard for any hostname (if needed)
          },
        ],
        unoptimized: true,
      }
};


export default nextConfig;
