import { createApp } from 'vue'
import App from './App.vue'
import DayUI, { DAffix } from '../packages'
const app = createApp(App)
console.log(DayUI)
app
  .use(DayUI)
  .use(DAffix)
  .mount('#app')
