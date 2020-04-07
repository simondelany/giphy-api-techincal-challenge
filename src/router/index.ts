import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import MostPopular from "../views/MostPopular.vue";
import Search from "../views/Search.vue";
import Random from "../views/Random.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/search"
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
