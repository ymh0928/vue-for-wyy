import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "", redirect: "/home" },
  {
    path: "/home",
    component: () => import("./views/home/Home"),
    children: [{ path: "/home", component: () => import("./views/main/Main") }],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
