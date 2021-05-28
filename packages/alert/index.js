import DAlert from './src/index.vue'
import '../../styles/alert.scss'
DAlert.install = function(app) {
  app.component(DAlert.name, DAlert)
}

export default DAlert
