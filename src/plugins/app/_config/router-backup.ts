import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/plugins/app/home/home.vue'),
  },
  {
    name: 'Form',
    path: '/form',
    component: () => import('@/plugins/app/form/form.vue'),
    beforeEnter(to, from, next) {
      if (!to.params.image
      || !to.params.deviceLocation) {
        next({ name: 'Home' });
      } else {
        next();
      }
    },
  },
  {
    name: 'Success',
    path: '/success',
    component: () => import('@/plugins/app/success/success.vue'),
  },
  {
    name: 'Fail',
    path: '/fail',
    component: () => import('@/plugins/app/fail/fail.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
