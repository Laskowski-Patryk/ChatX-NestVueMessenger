import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { VueReCaptcha } from "vue-recaptcha-v3";

const myV3App = createApp(App);
myV3App.use(VueReCaptcha, { siteKey: '6LfmM_AUAAAAANpCCWRuelX6dCGTwWpqtp8N8-3V' })
myV3App.use(router);
myV3App.mount("#app");
