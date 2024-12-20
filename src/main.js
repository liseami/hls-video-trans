import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { MotionPlugin } from '@vueuse/motion'
import { Vue3Lottie } from 'vue3-lottie'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(MotionPlugin)
app.component('Vue3Lottie', Vue3Lottie)

app.mount('#app') 