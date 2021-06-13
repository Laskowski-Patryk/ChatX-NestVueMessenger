import { createWebHistory, createRouter } from "vue-router";
import SignIn from "@/views/SignIn.vue";
import Register from "@/views/Register.vue";
import MainPage from "@/views/MainPage.vue";
import axios from "axios";
import { authHeader } from "../auth-header.js";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
    beforeEnter: (to: any, from: any, next: any) => {
      guard(to, from, next);
    },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    children: [{ path: "/signin/:emailverified", component: SignIn }],
    beforeEnter: (to: any, from: any, next: any) => {
      notSignedIn(to, from, next);
    },
  },
  {
    path: "/register",
    name: "Register",
    beforeEnter: (to: any, from: any, next: any) => {
      notSignedIn(to, from, next);
    },
    component: Register,
  },
];

const guard = function(to: any, from: any, next: any) {
  axios
    .get("http://localhost:3000/protected", { headers: authHeader() })
    .then((response) => {
      next();
    })
    .catch((error) => {

      window.location.href = "/signin";
    });
};

const notSignedIn = function(to: any, from: any, next: any) {
  axios
    .get("http://localhost:3000/protected", { headers: authHeader() })
    .then((response) => {
      window.location.href = "/";
    })
    .catch((error) => {
      next();
    });
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
