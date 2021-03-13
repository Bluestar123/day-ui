import { createApp } from 'vue'
import App from './App.vue'
import DButton from '../packages'
const app = createApp(App)

app.use(DButton).mount('#app')
