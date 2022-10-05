module.exports = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'i.scdn.co', 'cdn.shopify.com', 'www.free-stock-music.com', 'i1.sndcdn.com', 'www.free-stock-music.com', 'f4.bcbits.com', ]
  },
}
