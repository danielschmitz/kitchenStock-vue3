import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import SignUp from './views/SignUp.vue'
import LoginView from './views/LoginView.vue'

import CategoriesIndex from './views/Categories/Index.vue'
import CategoriesList from './views/Categories/List.vue'
import CategoriesCreate from './views/Categories/Create.vue'
import CategoriesEdit from './views/Categories/Edit.vue'

import ProductsIndex from './views/Products/Index.vue'
import ProductsList from './views/Products/List.vue'
import ProductsCreate from './views/Products/Create.vue'
import ProductsEdit from './views/Products/Edit.vue'

import StockIndex from './views/Stock/Index.vue'
import StockAdd from './views/Stock/Add.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/categories',
      component: CategoriesIndex,
      children: [
        {
          path: '',
          component: CategoriesList
        },
        {
          path: 'create',
          component: CategoriesCreate
        },
        {
          path: 'edit/:id',
          component: CategoriesEdit
        }
      ]
    },
    {
      path: '/products',
      component: ProductsIndex,
      children: [
        {
          path: '',
          component: ProductsList
        },
        {
          path: 'create',
          component: ProductsCreate
        },
        {
          path: 'edit/:id',
          component: ProductsEdit
        }
      ]
    },
    {
      path: '/stock',
      component: StockIndex,
      children: [
        {
          path: 'add',
          component: StockAdd
        }
      ]
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/login',
      component: LoginView
    }
  ]
})

export default router
