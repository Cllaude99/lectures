/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/here/:path*",
        destination: "/welcome/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:movieId",
        destination: `https://api.themoviedb.org/3/movie/:movieId?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
