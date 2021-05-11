import { createRouter, createWebHashHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import { Plugins } from '@capacitor/core'
import Tabs from '../_layout/tabs.vue'
// eslint-disable-next-line import/no-cycle
import store from './store'

const { Storage, SplashScreen } = Plugins

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/latest',
      },
      {
        name: 'Latest',
        path: 'latest',
        component: () => import('@/plugins/app@entity/latest/latest.vue'),
      },
      {
        name: 'Categories',
        path: 'categories',
        component: () => import('@/plugins/app@add-entity/categories/categories.vue'),
      },
      {
        name: 'Map',
        path: 'map',
        component: () => import('@/plugins/app@map/map/map.vue'),
      },
      {
        name: 'Settings',
        path: 'settings',
        component: () => import('@/plugins/app/settings/settings.vue'),
      },
      {
        name: 'Profile',
        path: 'profile',
        component: () => import('@/plugins/app@user/profile/profile.vue'),
      },
      {
        name: 'Groups',
        path: 'groups',
        component: () => import('@/plugins/app@group/groups/groups.vue'),
      },
    ],
  },

  // Without tabs
  {
    name: 'Form',
    path: '/form',
    component: () => import('@/plugins/app@add-entity/form/form.vue'),
  },
  {
    name: 'Success',
    path: '/success',
    component: () => import('@/plugins/app@add-entity/success/success.vue'),
  },
  {
    name: 'Slides',
    path: '/slides',
    component: () => import('@/plugins/app/slides/slides.vue'),
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/plugins/app@user/login/login.vue'),
  },
  {
    name: 'Tutorial',
    path: '/tutorial/:id',
    component: () => import('@/plugins/app@add-entity/tutorial/tutorial.vue'),
  },
  {
    name: 'EntityDetail',
    path: '/entity-detail/:id',
    component: () => import('@/plugins/app@entity/entity-detail/entity-detail.vue'),
  },
  {
    name: 'QnA',
    path: '/settings/qna',
    component: () => import('@/plugins/app/settings/qna.vue'),
  },
  {
    name: 'User',
    path: '/user/:id',
    component: () => import('@/plugins/app@user/user/user.vue'),
  },
  {
    name: 'Group',
    path: '/group/:id',
    component: () => import('@/plugins/app@group/group/group.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!store.getters.isUserLoggedIn && !(to.name === 'Index'
  || to.name === 'Login' || to.name === 'Slides')) {
    console.log('Login redirect')
    next({ name: 'Login' })
  } else if (store.getters.isUserLoggedIn && (to.name === 'Index' || to.name === 'Login' || to.name === 'Slides')) {
    next({ name: 'Latest' })
  } else {
    next()
  }
})

export default router
