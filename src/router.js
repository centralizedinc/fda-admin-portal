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
      // auto redirect to dashboard if session exists
      // beforeEnter: (to, from, next) => {
      //   if (store.state.user_session.isAuthenticated) {
      //     next("/app/dashboard");
      //   } else {
      //     next();
      //   }
      // }
    },
    {
      path: '/app',
      component: UserLayout,
      // beforeEnter: (to, from, next) => {
      //   if (store.state.user_session.isAuthenticated) {
      //     next()
      //   } else {
      //     store.commit('LOGOUT')
      //     next('/')
      //   }
      // },
      children: [{
          path: '',
          name: 'Dashboard',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'products',
          name: 'Product',
          component: () => import('@/views/app/reference/product.vue')
        },
        {
          path: 'primary',
          name: 'Primary',
          component: () => import('@/views/app/reference/primary.vue')
        },
        {
          path: 'capital',
          name: 'Capital',
          component: () => import('@/views/app/reference/capital.vue')
        },
        {
          path: 'Activity',
          name: 'Activity',
          component: () => import('@/views/app/reference/additionalActivity.vue')
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/app/accounts/profile.vue')
        },
        {
          path: 'group',
          name: 'Group',
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
          name: 'City',
          component: () => import('@/views/app/location/city.vue')
        },
        {
          path: 'region',
          name: 'Region',
          component: () => import('@/views/app/location/region.vue')
        },
        {
          path: 'province',
          name: 'Province',
          component: () => import('@/views/app/location/province.vue')
        },
        {
          path: 'UserProfile',
          name: 'User Profile',
          component: () => import('@/views/app/userProfile/UserProfile.vue')
        },
        {
          path: 'task',
          name: 'Task',
          component: () => import('@/views/app/task/task.vue')
        },
        {
          path: 'logout',
          name: 'Logout',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'admin',
          name: 'Admin Accounts',
          component: () => import('@/views/app/accounts/admin.vue')
        },
        {
          path: 'clients',
          name: 'Clients',
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