import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd, { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import axios from "axios";
import { transformTime, timestampToTime } from "./utils/utilFunc";
Vue.use(Antd);
Vue.prototype.$message = message;
axios.defaults.baseURL = "http://localhost:3000/";
Vue.prototype.$axios = axios;
Vue.prototype.$transformTime = transformTime;
Vue.prototype.$timestampToTime = timestampToTime;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
