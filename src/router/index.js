import { createWebHistory, createRouter } from "vue-router";
import SignIn from '@/views/SignIn.vue'
import Register from '@/views/Register.vue'
import MainPage from '@/views/MainPage.vue'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }

]

const guard = function(to, from, next) {
  axios.get('/api/checkAuthToken').then(response => {
      next();
  }).catch(error => {
      window.location.href = "/signin";
  })
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;