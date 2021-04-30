import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "", redirect: "/home" },
  {
    path: "/home",
    component: () => import("./views/home/Home"),
    children: [
      { path: "/home", component: () => import("./views/main/Main") },
      {
        path: "/sheet",
        component: () => import("./views/sheetlist/SheetList"),
      },
      {
        path: "/sheetInfo/:id",
        component: () => import("./views/sheetinfo/SheetInfo"),
      },
      {
        path: "/songInfo/:id",
        component: () => import("./views/songinfo/SongInfo"),
      },
      {
        path: "/singerInfo/:id",
        component: () => import("./views/singerdetail/SingerDetail"),
      },
      {
        path: "/member/:id",
        component: () => import("./views/member/Member"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
