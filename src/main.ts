import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueReCaptcha } from "vue-recaptcha-v3";
const compression = require('compression')
const myV3App = createApp(App);

myV3App.use(VueReCaptcha, { siteKey: '6LfmM_AUAAAAANpCCWRuelX6dCGTwWpqtp8N8-3V' })
myV3App.use(router);
myV3App.use(compression);
myV3App.mount("#app");
