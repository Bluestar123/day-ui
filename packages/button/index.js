import DButton from './src/button.vue'

DButton.install = app => {
  app.component(DButton.name, DButton)
}

export default DButton
