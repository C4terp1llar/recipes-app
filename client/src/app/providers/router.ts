import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/login'
import Signup from '@/pages/signup'
import MainLayout from '@/layouts/main'
import NotFound from '@/pages/notFound'
import {checkAuth} from "@/shared/api/checkAuth.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/',
      component: MainLayout,
      meta: { auth: true },
      children: [
        {
          path: '',
          redirect: { name: 'my-recipes' }
        },
        {
          path: 'my-recipes',
          name: 'my-recipes',
          component: () => import('@/pages/myRecipes'),
        },
        {
          path: 'add-recipe',
          name: 'add-recipe',
          component: () => import('@/pages/addRecipe'),
        },
        {
          path: 'recipes',
          name: 'recipe',
          component: () => import('@/pages/recipes'),
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    }
  ],
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact',
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')

  // если токена нет и маршрут защищенный
  if (to.meta.auth && !token) {
    return next('/login')
  }

  // если токен есть
  let isAuth = false

  if (token) {
    // если пользователь переходит между страницами в рамках защещенного лейаута то пропускаем без проверки
    if (to.meta.auth && from.meta.auth) return next()

    isAuth = await checkAuth()
  }

  if (to.meta.auth) {
    if (isAuth) return next()
    return next('/login')  // токен невалид
  } else {
    if (isAuth && (to.name === 'login' || to.name === 'signup')) {
      return next('/')  // если авторизован нельзя на логин/регистрацию
    }
    return next()
  }
})


export default router
