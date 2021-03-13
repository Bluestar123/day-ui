import DButton from './src/index.vue'
import '../../styles/button.scss'
DButton.install = app => {
  app.component(DButton.name, DButton)
}

export default DButton
