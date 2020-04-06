import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import MostPopular from "../views/MostPopular.vue";
import Search from "../views/Search.vue";
import Random from "../views/Random.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/most-popular",
    name: "MostPopular",
    component: MostPopular
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/random",
    name: "Random",
    component: Random
  }
];

const router = new VueRouter({
  routes
});

export default router;
