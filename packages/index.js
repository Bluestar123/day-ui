import DButton from './DButton'
import DButtonGroup from './d-button-group'
import DIcon from './DIcon'
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
