/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/, // Match shader file extensions
      use: [
        {
          loader: 'raw-loader', // Load shader files as raw strings
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
