const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpack(config) {
    config.resolve.fallback = {
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      os: require.resolve('os')
    };

    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    );

    config.entry = {
      main: path.resolve(__dirname, 'src/index.js'),
      CloseIcon: path.resolve(__dirname, 'src/components/base/icons/Close.js'),
      NotFoundIcon: path.resolve(
        __dirname,
        'src/components/base/icons/NotFound.js'
      )
    };

    config.stats = {
      errorDetails: true
    };

    config.optimization.splitChunks = {
      /*
        Webpack has some clever defaults that aren’t so clever, like a maximum
        of 3 files when splitting the output files, and a minimum file size of 30
        KB (all smaller files would be joined together). So I have overridden these.
      */
      minSize: 0,
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    };

    return config;
  }
};
