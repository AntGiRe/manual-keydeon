/** @type {import('next').NextConfig} */
const R2_PUBLIC_HOSTNAME = process.env.NEXT_PUBLIC_R2_PUBLIC_HOSTNAME || process.env.R2_PUBLIC_HOSTNAME || '';

const nextConfig = {
  output: 'standalone',
  images: R2_PUBLIC_HOSTNAME
    ? {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: R2_PUBLIC_HOSTNAME,
            pathname: '/**'
          }
        ]
      }
    : undefined
};

export default nextConfig;
