import { createRouter, createWebHistory } from "vue-router";
import mainPage from "./mainPage.vue";
import personStorage from "./personStorage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: mainPage },
  ],
});
