import DButton from './button'
import DButtonGroup from './button-group'
import DIcon from './icon'
import DAffix from './affix'
import '../styles/index.scss'
const components = [DButton, DIcon, DButtonGroup, DAffix]

const defaultInstallOpt = {
  size: 'medium',
  zIndex: 2000
}

const install = (app, options = {}) => {
  components.forEach(item => {
    app.component(item.name, item)
  })

  app.config.globalProperties.$DAY = Object.assign(
    {},
    defaultInstallOpt,
    options
  )
}

export default {
  version: '1.0.0',
  install
}

export { DButton, DIcon, DButtonGroup, DAffix }
