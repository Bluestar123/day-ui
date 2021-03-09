const path = require('path')
const fs = require('fs')

function resolve(filePath) {
  return path.join(__dirname, filePath)
}
const getEntries = dir => {
  // 整理需要加载的文件， dir 为各组件所在的共同目录
  let absolutionPath = path.resolve(dir)
  // 读取第一层的子元素，就是每个组件的包文件名
  let sonFiles = fs.readdirSync(absolutionPath)
  let entries = {}
  sonFiles.forEach(file => {
    // 路径拼接，得到组件所在位置
    let fileDirPath = path.join(absolutionPath, file)
    if (fs.statSync(fileDirPath).isDirectory()) {
      // 得到组件所在路径，继续拼接得到文件地址
      let filePath = path.join(fileDirPath, 'index.js')
      entries[file] = filePath
    }
  })
  return entries
}

module.exports = {
  pages: {
    index: {
      entry: 'example/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  outputDir: 'lib',
  configureWebpack: {
    entry: {
      // 传入打包文件所在目录，通过函数获取一个对象，获取所有组件入口
      ...getEntries('./packages')
    },
    output: {
      // 使用babel-plugin-import 实现按需导入
      filename: 'd-[name]/index.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      library: 'day-ui'
    }
  },
  css: {
    sourceMap: true, // 源码映射,
    extract: {
      filename: 'd-[name]/style.css'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('packages', resolve('packages'))
      .set('comp', resolve('src/components'))
      .set('style', resolve('styles'))
  }
}
