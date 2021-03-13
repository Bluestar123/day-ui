import DIcon from './src/index.vue'
import '../../styles/icon.scss'

DIcon.install = app => {
  app.component(DIcon.name, DIcon)
}

export default DIcon
