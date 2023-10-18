import 'normalize.css'
import './assets/css/common/reset.css'

import { createApp } from 'vue'
import router from './router'
import pinia from './stores'

import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
