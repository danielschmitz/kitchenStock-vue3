import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import SignUp from './views/SignUp.vue'
import LoginView from './views/LoginView.vue'

import CategoriesIndex from './views/Categories/Index.vue'
import CategoriesList from './views/Categories/List.vue'
import CategoriesCreate from './views/Categories/Create.vue'

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
      component: CategoriesIndex,
      children: [
        {
          path: '',
          name: 'list',
          component: CategoriesList,
        },
        {
          path: 'create',
          name: 'create',
          component: CategoriesCreate
        }
      ]
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
