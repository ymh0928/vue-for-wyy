import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import axios from "axios";
import { transformTime } from "./utils/utilFunc";
Vue.use(Antd);

axios.defaults.baseURL = "http://localhost:3000/";
Vue.prototype.$axios = axios;
Vue.prototype.$transformTime = transformTime;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
