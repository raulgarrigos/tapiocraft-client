import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Register from "./views/auth/Register.vue";
import Login from "./views/auth/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
