import { createApp } from 'vue'
import App from './App.vue'
import DayUI from '../packages'
const app = createApp(App)
console.log(DayUI)
app.use(DayUI).mount('#app')
