import DAffix from './src/index.vue'
import '../../styles/affix.scss'
console.log(5455555)
DAffix.install = app => {
  app.component(DAffix.name, DAffix)
}

export default DAffix
