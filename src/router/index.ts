import { createWebHistory, createRouter } from "vue-router";
import SignIn from "@/views/SignIn.vue";
import Register from "@/views/Register.vue";
import MainPage from "@/views/MainPage.vue";
import PasswordReset from "@/views/PasswordReset.vue";
import RecoverPassword from "@/views/RecoverPassword.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Profile from "@/views/Profile.vue";
import axios from '../axios';

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
    path: "/profile",
    name: "Profile",
    component: Profile,
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
  {
    path: "/passwordreset",
    name: "PasswordReset",
    beforeEnter: (to: any, from: any, next: any) => {
      notSignedIn(to, from, next);
    },
    component: PasswordReset,
  },
  {
    path: "/recoverpassword",
    name: "RecoverPassword",
    children: [{ path: "/recoverpassword/:token", component: RecoverPassword }],
    beforeEnter: (to: any, from: any, next: any) => {
      notSignedIn(to, from, next);
    },
    component: RecoverPassword,
  },
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
    name: 'PageNotFound'
  },
];

const guard = function(to: any, from: any, next: any) {
  axios
    .get("/protected")
    .then((response) => {
      next();
    })
    .catch((error) => {

      window.location.href = "/signin";
    });
};

const notSignedIn = function(to: any, from: any, next: any) {
  axios
    .get("/protected")
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
