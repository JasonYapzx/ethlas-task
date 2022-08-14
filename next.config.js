/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: ["vignette.wikia.nocookie.net"],
  },
}

module.exports = nextConfig
