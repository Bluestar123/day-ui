const path = require('path')

function resolve(filePath) {
  return path.join(__dirname, filePath)
}

module.exports = {
  pages: {
    index: {
      entry: 'example/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('packages', resolve('packages'))
      .set('comp', resolve('src/components'))
      .set('style', resolve('styles'))
  }
}
