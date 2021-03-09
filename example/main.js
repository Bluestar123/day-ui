import { createApp } from 'vue'
import App from './App.vue'
import DButton from '../packages'
console.log(DButton, 9)
const app = createApp(App)

app.use(DButton).mount('#app')
