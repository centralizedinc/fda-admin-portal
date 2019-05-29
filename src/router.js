import Vue from 'vue'
import Router from 'vue-router'
import UserLayout from '@/layout/UserLayout'
import MainLayout from '@/layout/MainLayout'
import store from './store';


Vue.use(Router)

function dropBreadcrumbs(to, from, next) {
  store.commit('DROP_BREADCRUMBS', {
    name: to.name,
    href: to.path
  })
  next();
}

export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: MainLayout,
      // auto redirect to dashboard if session exists
      beforeEnter: (to, from, next) => {
        console.log('isAuth2 :', store.state.user_session.isAuthenticated);
        if (store.state.user_session.isAuthenticated) {
          next("/app");
        } else {
          next();
        }
      },
      children: [{
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue')
      // },
      // {
      //   path: 'password/reset/:token',
      //   name: 'Password Reset',
      //   component: () => import('@/views/app/passwordSettings/ResetPassword.vue')
      }]
    },
    {
      path: '/app',
      component: UserLayout,
      beforeEnter: (to, from, next) => {
        console.log('isAuth :', store.state.user_session.isAuthenticated);
        if (store.state.user_session.isAuthenticated) {
          //leaving breadcrumbs behind    
          store.commit('DROP_BREADCRUMBS', {
            name: to.name,
            href: to.path
          })
          next()
        } else {
          store.commit('LOGOUT')
          next('/')
        }
      },
      children: [{
          path: '',
          name: 'Dashboard',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'productLine',
          name: 'Product Line',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/reference/productLine.vue')
        },
        // type of food product certificate
        {
          path: 'foodProduct',
          name: 'Type of Food Products',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/reference/typeOfFoodProduct.vue')
        },
        {
          path: 'foodCategory',
          name: 'Food Category',
          beforeEnter: dropBreadcrumbs, 
          component: () => import('@/views/app/reference/foodCategorization.vue')
        },
        {
          path: 'companyActivity',
          name: 'Company Activity',
          beforeEnter: dropBreadcrumbs, 
          component: () => import('@/views/app/reference/companyActivity.vue')
        },
        {
          path: 'shelfLife',
          name: 'Type of Shelf Life',
          beforeEnter: dropBreadcrumbs, 
          component: () => import('@/views/app/reference/shelfLife.vue')
        },
        {
          path: 'source',
          name: 'Type of Source',
          beforeEnter: dropBreadcrumbs, 
          component: () => import('@/views/app/reference/source.vue')
        },
        {
          path: 'productSpecifications',
          name: 'Product Specifications',
          beforeEnter: dropBreadcrumbs, 
          component: () => import('@/views/app/reference/productSpecifications.vue')
        },
        {
          path: 'designation',
          name: 'Designation',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/reference/designation.vue')
        },
        {
          path: 'countryOrigin',
          name: 'Country of Origin',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/reference/countryOrigin.vue')
        },
        {
          path: 'fees',
          name: 'Fees',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/payments/fees.vue')
        },
        {
          path: 'identification',
          name: 'Identification',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/reference/identification.vue')
        },
        {
          path: 'products',
          name: 'Product',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/reference/product.vue')
        },
        {
          path: 'primary',
          name: 'Primary',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/reference/primary.vue')
        },
        {
          path: 'capital',
          name: 'Declared Capital',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/reference/capital.vue')
        },
        {
          path: 'Activity',
          name: 'Additional Activity',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/reference/additionalActivity.vue')
        },
        {
          path: 'vitamins',
          name: 'Vitamins',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/reference/vitamins.vue')
        },
        {
          path: 'profile',
          name: 'Profile',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/accounts/profile.vue')
        },
        {
          path: 'group',
          name: 'Group',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/accounts/group.vue')
        },
        {
          path: 'payments',
          name: 'Payments',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'password',
          name: 'Change Password',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/passwordSettings/ChangePassword.vue')
        },
        {
          path: 'city',
          name: 'City',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/location/city.vue')
        },
        {
          path: 'region',
          name: 'Region',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/location/region.vue')
        },
        {
          path: 'province',
          name: 'Province',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/location/province.vue')
        },
        {
          path: 'UserProfile',
          name: 'User Profile',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/userProfile/UserProfile.vue')
        },
        {
          path: 'task',
          name: 'Task License',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/task/task.vue')
        },
        {
          path: 'checklist',
          name: 'Checklist License',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/task/checklist.vue')
        },
        {
          path: 'taskCert',
          name: 'Task Certificate',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/task/taskCert.vue')
        },
        {
          path: 'checklistCert',
          name: 'Checklist Certificate',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/task/checklistCert.vue')
        },
        {
          path: 'logout',
          name: 'Logout',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'admin',
          name: 'Admin Accounts',
          beforeEnter: dropBreadcrumbs,
          component: () => import('@/views/app/accounts/admin.vue')
        },
        {
          path: 'clients',
          name: 'Clients',
          beforeEnter: dropBreadcrumbs,
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