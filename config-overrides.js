module.exports = {
  webpack(config) {
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
