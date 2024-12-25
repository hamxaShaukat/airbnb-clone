/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['a0.muscache.com'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          }, {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
          },
        ],
      },
};

export default nextConfig;
