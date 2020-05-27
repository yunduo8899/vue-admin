import Vue from 'vue';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from "@vue/composition-api";
import "@/assets/icon/iconfont.js";
import "./router/premit.js";

Vue.use(ElementUI);  
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
