import DButtonGroup from './src/index.vue'
import '../../styles/button.scss'
DButtonGroup.install = app => {
  app.component(DButtonGroup.name, DButtonGroup)
}

export default DButtonGroup
