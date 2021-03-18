import DAffix from './src/index.vue'
import '../../styles/affix.scss'
DAffix.install = app => {
  app.component(DAffix.name, DAffix)
}

export default DAffix
