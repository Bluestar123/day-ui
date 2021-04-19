const path = require('path')
const fs = require('fs')
const join = path.join

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

function getEntries(path) {
  let files = fs.readdirSync(resolve(path))
  const entries = files.reduce((ret, item) => {
    if (item == 'utils') return ret
    const itemPath = join(path, item)
    const isDir = fs.statSync(itemPath).isDirectory()
    if (isDir) {
      ret[item] = resolve(join(itemPath, 'index.js'))
    } else {
      const [name] = item.split('.')
      ret[name] = resolve(`${itemPath}`)
    }
    return ret
  }, {})
  return entries
}

const devConfig = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        packages: resolve('packages'),
        assets: resolve('examples/assets'),
        views: resolve('examples/views')
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add('/packages')
      .end()
  }
}

const buildConfig = {
  outputDir: 'lib',
  productionSourceMap: false,
  configureWebpack: {
    entry: {
      ...getEntries('packages')
    },
    output: {
      filename: 'd-[name]/index.js',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      alias: {
        packages: resolve('packages')
      }
    },
    externals: [
      {
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue'
        }
      }
    ]
  },
  css: {
    sourceMap: true,
    extract: {
      filename: 'style/d-[name].css' //在lib文件夹中建立style文件夹中，生成对应的css文件。
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })

    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')

    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(option => {
        option.fallback.options.name = 'static/fonts/[name].[ext]'
        return option
      })
  }
}

module.exports =
  process.env.NODE_ENV === 'development' ? devConfig : buildConfig
