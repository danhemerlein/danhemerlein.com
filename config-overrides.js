const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function override(config) {
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

  // config.plugins.push(new BundleAnalyzerPlugin({ generateStatsFile: true }));

  config.stats = {
    errorDetails: true
  };

  return config;
};
