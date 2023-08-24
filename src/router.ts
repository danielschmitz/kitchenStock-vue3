import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import CategoriesView from './views/CategoriesView.vue'
import SignUp from './views/SignUp.vue'
import LoginView from './views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
