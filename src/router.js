import Vue from 'vue'
import Router from 'vue-router'
import UserLayout from '@/layout/UserLayout'
import MainLayout from '@/layout/MainLayout'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: MainLayout,
      children: [{
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue')
      }]

    },
    {
      path: '/app',
      component: UserLayout,
      children: [{
          path: '',
          name: 'Dashboard',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'products',
          name: 'product',
          component: () => import('@/views/app/reference/product.vue')
        },
        {
          path: 'primary',
          name: 'primary',
          component: () => import('@/views/app/reference/primary.vue')
        },
        {
          path: 'capital',
          name: 'capital',
          component: () => import('@/views/app/reference/capital.vue')
        },
        {
          path: 'Activity',
          name: 'Activity',
          component: () => import('@/views/app/reference/additionalActivity.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/app/accounts/profile.vue')
        },
        {
          path: 'group',
          name: 'group',
          component: () => import('@/views/app/accounts/group.vue')
        },
        {
          path: 'payments',
          name: 'Payments',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'password',
          name: 'Change Password',
          component: () => import('@/views/app/passwordSettings/ChangePassword.vue')
        },
        {
          path: 'city',
          name: 'city',
          component: () => import('@/views/app/location/city.vue')
        },
        {
          path: 'region',
          name: 'region',
          component: () => import('@/views/app/location/region.vue')
        },
        {
          path: 'province',
          name: 'province',
          component: () => import('@/views/app/location/province.vue')
        },
        {
          path: 'task',
          name: 'task',
          component: () => import('@/views/app/task/task.vue')
        },
        {
          path: 'logout',
          name: 'Logout',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'clients',
          name: 'client',
          component: () => import('@/views/app/accounts/client.vue')
        },
        {
          path: 'test',
          name: 'test',
          component: () => import('@/views/app/accounts/test.vue')
        }
      ]

    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})