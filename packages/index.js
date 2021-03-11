import DButton from './DButton'
import DTest from './DButton'
import '../styles/index.scss'
const components = [DButton, DTest]

const defaultInstallOpt = {
  size: 'medium',
  zIndex: 2000
}

const install = (app, options = {}) => {
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

export { DButton, DTest }
