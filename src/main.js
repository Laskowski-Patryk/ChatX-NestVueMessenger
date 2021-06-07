import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const myV3App = createApp(App)
myV3App
.use(router)
myV3App.mount('#app')