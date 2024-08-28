const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter(
        (plugin) => !(plugin instanceof OptimizeCSSAssetsPlugin)
      );
      return webpackConfig;
    },
  },
};
