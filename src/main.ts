import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VueCookies, { expires: '30d' })
app.use(router)

app.mount('#app')
