require('dotenv').config();
const path = require('path');

module.exports = {
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.BASE_URL,
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // Example using webpack option
    config.resolve.modules.push(path.resolve('./'));
    return config;
  },
};
