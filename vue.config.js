const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/assets/styles/styles.scss";'
            }
        }
    },
    configureWebpack: {
        plugins: [
            new StylelintPlugin({
            files: ['src/**/*.{vue,css,scss,sass}'],
            fix: true 
      })
    ]
  }
}

