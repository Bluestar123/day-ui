import DButton from './button'
import DButtonGroup from './button-group'
import DIcon from './icon'
import '../styles/index.scss'
const components = [DButton, DIcon, DButtonGroup]

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

export { DButton, DIcon, DButtonGroup }
