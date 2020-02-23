import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () => import('@/views/pages/Index'),
      children: [
        // Login
        {
          name: 'Login',
          path: '',
          component: () => import('@/views/pages/Login'),
          meta: {
            auth: false,
          },
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
          meta: {
            auth: true,
          },
        },
        {
          name: 'Company',
          path: 'company',
          component: () => import('companyModule/components/Index'),
          meta: {
            auth: true,
          },
        },
      ],
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error'),
        },
      ],
    },
  ],
})
