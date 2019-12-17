require('dotenv').config()
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    }

    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }

    return config
  },
}
