const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === 'production') {
        // Disable default minimizers (including CSS minification)
        webpackConfig.optimization.minimizer = [
          new TerserPlugin({
            terserOptions: {
              compress: true,  // Enable JS minification
              mangle: true,    // Enable variable and function name mangling
              // Add more options as needed for fine-tuning
            },
          }),
        ];

        // Ensure CSS is not minified (no CSS minimizer)
        webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter(
          (minimizer) => minimizer.constructor.name !== 'CssMinimizerPlugin'
        );
      }
      return webpackConfig;
    },
    plugins: [
      new BundleAnalyzerPlugin(),
    ]
  },
};