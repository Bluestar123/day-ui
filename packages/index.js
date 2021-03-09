import DButton from './button'
const components = [DButton]

const defaultInstallOpt = {
  size: 'medium',
  zIndex: 2000
}

const install = (app, options = {}) => {
  console.log(app, 8)

  components.forEach(item => {
    app.component(item.name, item)
  })

  app.config.globalProperties.$PEACE = Object.assign(
    {},
    defaultInstallOpt,
    options
  )
}

export default {
  version: '1.0.0',
  install
}

export { DButton }
