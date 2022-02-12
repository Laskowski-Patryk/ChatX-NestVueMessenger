import { createWebHistory, createRouter } from "vue-router";
import axios from "../axios";
const Register = () => import("@/views/Register.vue")
const MainPage = () => import("@/views/MainPage.vue")
const SignIn = () => import("@/views/SignIn.vue")
const PasswordReset = () => import("@/views/PasswordReset.vue")
const RecoverPassword = () => import("@/views/RecoverPassword.vue")
const PageNotFound = () => import("@/views/PageNotFound.vue")
const Profile = () => import("@/views/Profile.vue")
const AdminPanel = () => import("@/views/AdminPanel.vue")
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
    path: "/adminPanel",
    name: "AdminPanel",
    component: AdminPanel,
    beforeEnter: (to: any, from: any, next: any) => {
      guard(to, from, next);
      permissionLevel(to, from, next);

    },
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
    name: "PageNotFound",
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

const permissionLevel = function(to: any, from: any, next: any) {
  const x = localStorage.getItem("permission") as any;
  if (x < 2) {
    window.location.href = "/";
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(),

  routes,
});

export default router;
