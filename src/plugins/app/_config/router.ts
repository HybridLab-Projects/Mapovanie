import { createRouter, createWebHashHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import { Plugins } from '@capacitor/core'
import Tabs from '../_layout/tabs.vue'
// eslint-disable-next-line import/no-cycle
import store from './store'

const { Storage, SplashScreen } = Plugins

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Index',
    path: '/',
    component: () => import('@/plugins/app/index/index.vue'),
    async beforeEnter(to, from, next) {
      const slides = await Storage.get({ key: 'slidesFinished' })
      console.log('slides', slides)
      if (!slides.value) {
        await SplashScreen.hide()
        next({ name: 'Slides' })
      } else {
        next()
      }
    },
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
    ],
  },

  // Without tabs
  {
    name: 'Form',
    path: '/form',
    component: () => import('@/plugins/app@add-entity/form/form.vue'),
    beforeEnter(to, from, next) {
      if (!to.params.image
          || !to.params.deviceLocation) {
        next({ name: 'Latest' })
      } else {
        next()
      }
    },
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
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!store.getters.isUserLoggedIn && !(to.name === 'Index' || to.name === 'Login' || to.name === 'Slides')) {
    next({ name: 'Login' })
  } else if (store.getters.isUserLoggedIn && to.name === 'Login') {
    next({ name: 'Latest' })
  } else {
    next()
  }
})

export default router
