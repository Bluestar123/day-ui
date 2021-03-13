import { createApp } from 'vue'
import App from './App.vue'
// import DButton from '../packages'
import DButton from '../lib/d-button'
import '../lib/style/d-button.css'
const app = createApp(App)

app.use(DButton).mount('#app')
